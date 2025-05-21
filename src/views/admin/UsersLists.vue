<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Users List</h1>
      <div class="space-x-2">
        <button
            @click="openFilters"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
        <button
            @click="fetchAllUsers"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
        <button
            @click="fetchAllUsers"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>
    </div>
    <div v-if="showFilters" class="mb-4">
      <div class=" grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input type="text" placeholder="username" class="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
        <input type="text" placeholder="Email" class="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
        <input type="text" placeholder="phone" class="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
      </div>
      <p class="text-gray-500 mb-4">
        Filter Users
      </p>
      <div class="mb-4">
        <input
            type="text"
            placeholder="Search by name or email"
            class="border border-gray-300 rounded px-4 py-2 w-full"
            @input="fetchAllUsers"
        />
      </div>
    </div>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    <div v-if="isLoading" class="text-center animate-pulse py-8">
      <p>Loading users...</p>
    </div>

    <div v-else-if="!users.length" class="text-center py-12">
      <p class="text-gray-500">No users found</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border text-xs border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-2 text-left">ID</th>
          <th class="py-2 px-2 text-left">Name</th>
          <th class="py-2 px-2 text-left">Email</th>
          <th class="py-2 px-2 text-left">Phone</th>
          <th class="py-2 px-2 text-left">Roles</th>
          <th class="py-2 px-2 text-left">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="hover:bg-gray-50 transition-colors"
        >
          <td class="py-2 px-2 border-t">{{ index + 1 }}</td>
          <td class="py-2 px-2 border-t">{{ user.fullname }}</td>
          <td class="py-2 px-2 border-t">{{ user.email }}</td>
          <td class="py-2 px-2 border-t">{{ user.phoneNo || '-' }}</td>
          <td class="py-2 px-2 border-t">
            <div class="flex flex-wrap gap-1">
                <span
                    v-for="role in user.roles"
                    :key="role"
                    class="px-2 py-1 text-xs rounded-sm "
                    :class="{
                    'bg-purple-100 text-purple-800  border-2 border-purple-900': role === 'ADMIN',
                    'bg-blue-100 text-blue-800 border-2 border-blue-900': role === 'TEACHER',
                    'bg-green-100 text-green-800 border-2 border-green-900': role === 'STUDENT'
                  }"
                >
                  {{ role }}
                </span>
            </div>
          </td>
          <td class="py-3 px-4 border-t relative">
            <div class="relative inline-block text-left">
              <button
                  @click="toggleDropdown(user.id)"
                  class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Actions
                <svg
                    class="-mr-1 ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                  v-if="activeDropdown === user.id"
                  class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-auto"
              >
                <div class="py-1" role="menu" aria-orientation="vertical">
                  <button
                      @click="editUser(user.id)"
                      class="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                  >
                    Edit
                  </button>
                  <button
                      @click="confirmDelete(user.id)"
                      class="block px-2 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-900 w-full text-left"
                      role="menuitem"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import type {UsersLists} from "@/models/LoginRequests.ts";
import {AuthService} from "@/services/AuthService.ts";

const users = ref<UsersLists[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const activeDropdown = ref<number | null>(null);
const showFilters = ref(false);
const toggleDropdown = (userId: number) => {
  activeDropdown.value = activeDropdown.value === userId ? null : userId;
};

const closeDropdowns = () => {
  activeDropdown.value = null;
};
const openFilters = () => {
  showFilters.value = !showFilters.value;
};

const fetchAllUsers = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await AuthService.listAllUsers();
    users.value = response;

    console.log(response, ": user response");
  } catch (err) {
    error.value = "Failed to load users. Please try again.";
    console.error("Error fetching users:", err);
  } finally {
    isLoading.value = false;
  }
};

const editUser = (userId: number) => {
  // Navigate to edit page or open edit modal
  console.log("Edit user:", userId);
};

const confirmDelete = (userId: number) => {
  if (confirm("Are you sure you want to delete this user?")) {
    deleteUser(userId);
  }
};

const deleteUser = async (userId: number) => {
  try {
    await AuthService.deleteUser(userId);
    users.value = users.value.filter(user => user.id !== userId);
  } catch (err) {
    error.value = "Failed to delete user. Please try again.";
    console.error("Error deleting user:", err);
  }
};

onMounted(() => {
  fetchAllUsers();
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.relative.inline-block')) {
      closeDropdowns();
    }
  });
});
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

tr:last-child td {
  border-bottom: none;
}
</style>