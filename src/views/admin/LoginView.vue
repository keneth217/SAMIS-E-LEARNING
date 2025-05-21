<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 class="my-10 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ authStore.error }}
      </div>

      <div v-if="authStore.success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        {{ authStore.success }}
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
                id="username"
                v-model="loginForm.phoneNo"
                name="username"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                v-model="loginForm.password"
                name="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
            />
          </div>
        </div>

        <div class="flex justify-end items-center">

          <router-link to="/reset-password" class="font-medium text-blue-600 hover:text-blue-500">
            Forgot Password?
          </router-link>
        </div>

        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="authStore.isLoading"
          >
            <span v-if="!authStore.isLoading">Sign in</span>
            <span v-else>Signing in...</span>
          </button>
        </div>
      </form>

      <div>
        <p>
          Don't have an account?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import type { LoginRequests } from '@/models/LoginRequests';

const authStore = useAuthStore();
const loginForm = ref<LoginRequests>({
  phoneNo: '',
  password: ''
});

const login = async () => {
  await authStore.login(loginForm.value);
};
</script>