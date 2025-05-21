<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register New User
        </h2>
      </div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Personal Information -->
          <div>
            <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
                id="fullname"
                v-model="registerForm.fullname"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
                id="email"
                v-model="registerForm.email"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <!-- Contact Information -->
          <div>
            <label for="phoneNo" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
                id="phoneNo"
                v-model="registerForm.phoneNo"
                type="tel"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label for="idNumber" class="block text-sm font-medium text-gray-700">ID Number</label>
            <input
                id="idNumber"
                v-model="registerForm.idNumber"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <!-- Address Information -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input
                id="address"
                v-model="registerForm.address"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label for="county" class="block text-sm font-medium text-gray-700">County</label>
            <input
                id="county"
                v-model="registerForm.county"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label for="subcounty" class="block text-sm font-medium text-gray-700">Subcounty</label>
            <input
                id="subcounty"
                v-model="registerForm.subcounty"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <div class="mt-2 space-y-2">
              <div v-for="role in availableRoles" :key="role.value" class="flex items-center">
                <input
                    :id="`role-${role.value}`"
                    v-model="registerForm.roles"
                    type="checkbox"
                    :value="role.value"
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label :for="`role-${role.value}`" class="ml-2 block text-sm text-gray-700">
                  {{ role.label }}
                </label>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
                id="password"
                v-model="registerForm.password"
                type="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                type="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
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
            <span v-if="!isLoading">Register</span>
            <span v-else>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {AuthService} from "@/services/AuthService.ts";

interface RegisterForm {
  fullname: string;
  email: string;
  phoneNo: string;
  idNumber: string;
  address: string;
  county: string;
  subcounty: string;
  roles: string[];
  password: string;
  confirmPassword: string;
}

const router = useRouter();
const isLoading = ref(false);
const error = ref<string | null>(null);
const passwordError = ref<string | null>(null);

const availableRoles = [
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'STUDENT', label: 'Student' },
  { value: 'ADMIN', label: 'Administrator' },

];

const registerForm = ref<RegisterForm>({
  fullname: '',
  email: '',
  phoneNo: '',
  idNumber: '',
  address: '',
  county: '',
  subcounty: '',
  roles: ['ADMIN'],
  password: '',
  confirmPassword: ''
});

const validatePassword = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    passwordError.value = 'Passwords do not match';
  } else {
    passwordError.value = null;
  }
};

const register = async () => {
  if (passwordError.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const response = await AuthService.register({
      fullname: registerForm.value.fullname,
      email: registerForm.value.email,
      phoneNo: registerForm.value.phoneNo,
      idNumber: registerForm.value.idNumber,
      address: registerForm.value.address,
      county: registerForm.value.county,
      subcounty: registerForm.value.subcounty,
      roles: registerForm.value.roles,
      password: registerForm.value.password
    });

    // Handle successful registration
    console.log('User registered:', response.data);
    router.push('/users'); // Redirect to users list or login page
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 400) {
        error.value = err.response.data.message || 'Validation error';
      } else if (err.response.status === 409) {
        error.value = 'Phone number or ID number already exists';
      } else {
        error.value = 'An error occurred during registration';
      }
    } else {
      error.value = 'Network error. Please try again.';
    }
    console.error('Registration error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>