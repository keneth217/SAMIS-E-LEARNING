<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 class="text-center text-2xl font-bold text-gray-900">
          Change Password
        </h2>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <!-- Success Message -->
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        {{ success }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="changePassword">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Current Password -->
          <div>
            <label for="oldPassword" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
                id="oldPassword"
                v-model="passwordForm.oldPassword"
                type="password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter current password"
            />
          </div>

          <!-- New Password -->
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
                id="newPassword"
                v-model="passwordForm.newPassword"
                type="password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter new password"
            />
          </div>

          <!-- Confirm New Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                @blur="validatePassword"
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isLoading"
          >
            <span v-if="!isLoading">Change Password</span>
            <span v-else>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Changing...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/apiClient';
import {AuthService} from "@/services/AuthService.ts";
import {useAuthStore} from "@/stores/AuthStore.ts";
import type {LoginResponse} from "@/models/LoginRequests.ts";

const router = useRouter();
const isLoading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const authStore = useAuthStore();
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const  userId= ref<number | null>(null);
const currentUser= ref<LoginResponse| null>(null);
const getCurrentUser = async () => {
  authStore.currentUser= currentUser.value
}
onMounted(async () => {
  await getCurrentUser();
})
console.log(authStore.currentUser)
console.log(authStore.currentUser?.id)
const validatePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Passwords do not match';
  } else {
    passwordError.value = null;
  }
};

const changePassword = async () => {
  if (passwordError.value) return;

  isLoading.value = true;
  error.value = null;
  success.value = null;

  try {
    const response = AuthService.changePassword( {
      userID: currentUser.value?.id,
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    });

    success.value = 'Password changed successfully!';
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    // Optionally redirect after success
    setTimeout(() => {
      router.push('/profile');
    }, 2000);

  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 400) {
        error.value = err.response.data.message || 'Current password is incorrect';
      } else {
        error.value = 'An error occurred while changing password';
      }
    } else {
      error.value = 'Network error. Please try again.';
    }
    console.error('Password change error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>