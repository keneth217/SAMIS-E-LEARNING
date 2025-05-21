// stores/AuthStore.ts
import {defineStore} from "pinia";
import router from "@/router";
import apiClient from "@/apiClient";
import type {LoginRequests, LoginResponse} from "@/models/LoginRequests";

interface AuthState {
    currentUser: LoginResponse | null;
    error: string | null;
    success: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
        error: null,
        success: null,
        isLoading: false,
        isAuthenticated: !!localStorage.getItem('token')
    }),

    actions: {
        async login(loginRequest: LoginRequests) {
            this.isLoading = true;
            this.error = null;
            this.success = null;
            try {
                const response = await apiClient.post<LoginResponse>('/auth/sign-in', loginRequest);
                console.log(response.data, "in store");
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('roles', response.data.roles);

                this.currentUser = response.data;
                this.isAuthenticated = true;
                this.success = 'Login successful, redirecting...';

                setTimeout(() => {
                    this.success = null;
                    const userRoles = this.currentUser?.roles || [];


                    if (userRoles.includes('ADMIN')) {
                        router.push('/admin');
                    }
                    else if (userRoles.includes('TEACHER')) {
                        router.push('/teacher');
                    }
                    else if (userRoles.includes('STUDENT')) {
                        router.push('/student');
                    }
                    else {

                        this.currentUser = null;
                        router.push('/login');
                    }
                }, 2000);

                return true;
            } catch (error: unknown) {
                this.handleLoginError(error);
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');

            this.currentUser = null;
            this.isAuthenticated = false;
            this.error = null;

            router.push('/login');
        },

        initialize() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (token && user) {
                try {
                    this.currentUser = JSON.parse(user);
                    this.isAuthenticated = true;
                } catch {
                    this.logout();
                }
            }
        },

        handleLoginError(error: any) {
            let errorMessage = 'Login failed. Please try again.';

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = error.response.data?.message || 'Invalid request';
                        break;
                    case 401:
                        errorMessage = 'Invalid credentials';
                        break;
                    case 403:
                        errorMessage = 'Access denied';
                        break;
                    case 500:
                        errorMessage = 'Server error';
                        break;
                }
            } else {
                errorMessage = error.message || 'Network error';
            }

            this.error = errorMessage;
        }
    },

    getters: {
        userInfo(state): Omit<LoginResponse, 'token'> | null {
            if (!state.currentUser) return null;
            const {token, ...userInfo} = state.currentUser;
            return userInfo;
        },
        isAdmin(state): boolean {
            return state.currentUser?.roles === 'ADMIN';
        }
    }
});