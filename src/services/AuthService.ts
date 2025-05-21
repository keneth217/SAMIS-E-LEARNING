import type {RegisterRequests, RegisterResponse} from "@/models/LoginRequests.ts";
import apiClient from "@/apiClient.ts";

export const AuthService = {

    async listAllUsers()    {
        try {
            const response = await apiClient.post<any>('/auth/list-users');
            return response.data;
        }catch (error) {
            console.error('Error fetching users:', error);
            return null;
        }
    },

    async register(registerRequest: RegisterRequests): Promise<RegisterResponse | null> {
        try {
            const response = await apiClient.post<RegisterResponse>('/auth/add-user', registerRequest);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            return null;
        }
    },

    async changePassword(changePasswordRequest: any): Promise<any | null> {
        try {
            const response = await apiClient.post<any>('/auth/change-password', changePasswordRequest);
            return response.data;
        } catch (error) {
            console.error('Change password error:', error);
            return null;
        }
    },

    async updateUser(updateUserRequest: any): Promise<any | null> {
        try {
            const response = await apiClient.post<any>('/auth/update-user', updateUserRequest);
            return response.data;
        } catch (error) {
            console.error('Update user error:', error);
            return null;
        }
    }


}