<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';

// Types
interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  courses: number;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  qualifications?: string;
  bio?: string;
}

// Teacher form data
const formData = ref({
  id: 0,
  name: '',
  email: '',
  phone: '',
  department: '',
  joinDate: '',
  status: 'active' as const,
  qualifications: '',
  bio: ''
});

// List of teachers
const teachers = ref<Teacher[]>([
  {
    id: 1,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@edulearn.com',
    phone: '(555) 123-4567',
    department: 'Computer Science',
    courses: 4,
    joinDate: '2023-09-15',
    status: 'active',
    qualifications: 'Ph.D. in Computer Science, Stanford University',
    bio: 'Dr. Smith specializes in artificial intelligence and machine learning with over 10 years of teaching experience.'
  },
  {
    id: 2,
    name: 'Prof. Michael Johnson',
    email: 'michael.j@edulearn.com',
    phone: '(555) 987-6543',
    department: 'Mathematics',
    courses: 3,
    joinDate: '2022-05-20',
    status: 'active',
    qualifications: 'Ph.D. in Applied Mathematics, MIT',
    bio: 'Professor Johnson is an expert in statistical analysis and mathematical modeling.'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.w@edulearn.com',
    phone: '(555) 456-7890',
    department: 'Data Science',
    courses: 2,
    joinDate: '2024-01-10',
    status: 'active',
    qualifications: 'M.S. in Data Science, Harvard University',
    bio: 'Sarah brings industry experience from her time at leading tech companies.'
  }
]);

// UI state
const isAddingTeacher = ref(false);
const isViewingTeacher = ref(false);
const currentTeacher = ref<Teacher | null>(null);
const searchQuery = ref('');
const isEditing = ref(false);
const isDarkMode = ref(false);

// Filter teachers based on search query
const filteredTeachers = computed(() => {
  if (!searchQuery.value) return teachers.value;
  const query = searchQuery.value.toLowerCase();
  return teachers.value.filter(teacher =>
      teacher.name.toLowerCase().includes(query) ||
      teacher.email.toLowerCase().includes(query) ||
      teacher.department.toLowerCase().includes(query)
  );
});

// Departments for dropdown
const departments = [
  'Computer Science',
  'Mathematics',
  'Data Science',
  'Engineering',
  'Business',
  'Arts & Humanities',
  'Medicine',
  'Physics'
];

// Reset form data
const resetForm = () => {
  formData.value = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    department: '',
    joinDate: '',
    status: 'active',
    qualifications: '',
    bio: ''
  };
  isEditing.value = false;
};

// Add new teacher
const addTeacher = () => {
  if (isEditing.value) {
    // Update existing teacher
    const index = teachers.value.findIndex(t => t.id === formData.value.id);
    if (index !== -1) {
      teachers.value[index] = {
        ...formData.value,
        courses: teachers.value[index].courses, // Preserve courses count
        id: formData.value.id
      };
    }
  } else {
    // Add new teacher
    const newId = Math.max(0, ...teachers.value.map(t => t.id)) + 1;
    teachers.value.push({
      ...formData.value,
      id: newId,
      courses: 0
    });
  }

  isAddingTeacher.value = false;
  resetForm();
};

// View teacher details
const viewTeacher = (teacher: Teacher) => {
  currentTeacher.value = teacher;
  isViewingTeacher.value = true;
};

// Edit teacher
const editTeacher = (teacher: Teacher) => {
  formData.value = {...teacher};
  isEditing.value = true;
  isAddingTeacher.value = true;
  isViewingTeacher.value = false;
};

// Delete teacher
const deleteTeacher = (id: number) => {
  if (confirm('Are you sure you want to delete this teacher?')) {
    teachers.value = teachers.value.filter(t => t.id !== id);
    if (isViewingTeacher.value && currentTeacher.value?.id === id) {
      isViewingTeacher.value = false;
    }
  }
};

// Validate form before submission
const isFormValid = computed(() => {
  return formData.value.name &&
      formData.value.email &&
      formData.value.department &&
      formData.value.joinDate;
});

// Cancel form
const cancelForm = () => {
  isAddingTeacher.value = false;
  resetForm();
};

// Format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// Check system preference for dark mode on mount
onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

// Calculate time with teacher
const calculateTimeWithTeacher = (joinDate: string) => {
  const now = new Date();
  const join = new Date(joinDate);
  const diff = now.getTime() - join.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  return `${Math.floor(days / 365)} years, ${Math.floor((days % 365) / 30)} months`;
};

// Get random pastel color for department tags
const getDepartmentColor = (department: string) => {
  const colors = {
    'Computer Science': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Mathematics': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Data Science': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Engineering': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Business': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'Arts & Humanities': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'Medicine': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Physics': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  };

  return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};
</script>

<template>
  <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 transition-colors duration-300">
    <!-- Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-semibold text-blue-500  ">
          Teacher Management</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Add, view, and manage teacher profiles</p>
      </div>
      <div class="flex items-center space-x-4">

        <button
            @click="isAddingTeacher = true; resetForm()"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300"
            v-if="!isAddingTeacher && !isViewingTeacher">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"/>
          </svg>
          Add New Teacher
        </button>
        <button
            @click="isViewingTeacher = false; isAddingTeacher = false"
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center transition-all duration-300"
            v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"/>
          </svg>
          Back to List
        </button>
      </div>
    </div>

    <!-- Add/Edit Teacher Form -->
    <div v-if="isAddingTeacher"
         class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <h2 class="text-xl font-medium mb-6 text-blue-600 dark:text-blue-400">
        {{ isEditing ? 'Edit Teacher Profile' : 'Add New Teacher' }}</h2>
      <form @submit.prevent="addTeacher" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              Basic Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                  type="text"
                  v-model="formData.name"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter teacher's full name"
                  required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                  type="email"
                  v-model="formData.email"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter teacher's email"
                  required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                  type="tel"
                  v-model="formData.phone"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter teacher's phone number"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
              <select
                  v-model="formData.department"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
              >
                <option value="" disabled>Select department</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date</label>
              <input
                  type="date"
                  v-model="formData.joinDate"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <div class="flex space-x-4 mt-2">
                <label class="inline-flex items-center">
                  <input
                      type="radio"
                      v-model="formData.status"
                      value="active"
                      class="form-radio text-blue-500 h-4 w-4"
                  >
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Active</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                      type="radio"
                      v-model="formData.status"
                      value="inactive"
                      class="form-radio text-blue-500 h-4 w-4"
                  >
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20"
                   fill="currentColor">
                <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              Additional Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualifications</label>
              <input
                  type="text"
                  v-model="formData.qualifications"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter teacher's qualifications"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biography</label>
              <textarea
                  v-model="formData.bio"
                  rows="6"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter teacher's bio and experience"
              ></textarea>
            </div>

            <div class="pt-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Photo</label>
              <div
                  class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-700 transition-all hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                <input type="file" class="hidden" accept="image/*">
                <button type="button"
                        class="mt-4 px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  Select Image
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
              type="button"
              @click="cancelForm"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
              type="submit"
              class="px-6 py-2 bg-blue-500  hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center"
              :disabled="!isFormValid"
              :class="{'opacity-50 cursor-not-allowed': !isFormValid}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
            {{ isEditing ? 'Update Teacher' : 'Add Teacher' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Teacher Details View -->
    <div v-else-if="isViewingTeacher && currentTeacher"
         class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <!-- Cover and Profile Image -->
      <div class="bg-gradient-to-r from-blue-400 to-purple-600 h-48 relative">
        <div class="absolute -bottom-16 left-6 flex items-end">
          <div
              class="h-32 w-32  rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-4xl font-light text-blue-500 dark:text-purple-400 overflow-hidden shadow-lg">
            {{ currentTeacher.name.charAt(0) }}
          </div>
          <div class="ml-4 pb-4">
            <h2 class="text-2xl font-bold mt-4 text-white">{{ currentTeacher.name }}</h2>
            <div class="flex items-center">
              <span
                  :class="['px-2 py-1 rounded-full text-xs font-medium mt-1', getDepartmentColor(currentTeacher.department)]">
                {{ currentTeacher.department }}
              </span>
              <span class="text-blue-100 text-sm ml-2">· {{
                  calculateTimeWithTeacher(currentTeacher.joinDate)
                }} with us</span>
            </div>
          </div>
        </div>
        <div class="absolute top-4 right-4 flex space-x-2">
          <button
              @click="editTeacher(currentTeacher)"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
              title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </button>
          <button
              @click="deleteTeacher(currentTeacher.id)"
              class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
              title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Teacher Details -->
      <div class="pt-20 px-6 pb-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Information -->
          <div class="lg:col-span-2 space-y-6">
            <div
                class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300">
              <h3 class="text-lg font-medium mb-4 flex items-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"/>
                </svg>
                About
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ currentTeacher.bio || 'No biography available.' }}</p>
            </div>

            <div class="bg-gray-50 dark
:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300">
              <h3 class="text-lg font-medium mb-4 flex items-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7
  4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
                Contact Information
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> {{ currentTeacher.email }}<br>
                <strong>Phone:</strong> {{ currentTeacher.phone }}
              </p>
            </div>

            <div
                class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300">
              <h3 class="text-lg font-medium mb-4 flex items-center text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414
0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7
  4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414
1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
                Qualifications
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ currentTeacher.qualifications || 'No qualifications available.' }}</p>
            </div>
          </div>

          <!-- Courses Taught -->
          <div
              class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300">
            <h3 class="text-lg font-medium mb-4 flex items-center text-blue-600 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464
  4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414
0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7
  4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414
  8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1
  1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
              </svg>
              Courses Taught
            </h3>
            <ul class="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li v-for="i in currentTeacher.courses" :key="i">Course {{ i }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Teacher List -->
    <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <h2 class="text-xl font-medium mb-6 text-blue-600 dark:text-blue-400">All Teachers</h2>

      <!-- Search Bar -->
      <div class="mb-4">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name, email, or department"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
      </div>

      <!-- Teacher Table -->
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
        <tr class="bg-gray-50
                dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Join Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
        </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="teacher in filteredTeachers" :key="teacher.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{{
              teacher.name
            }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ teacher.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ teacher.department }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(teacher.joinDate) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ teacher.status }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
                @click="viewTeacher(teacher)"
                class="text-blue-600 hover:text-blue-900 dark:hover:text-blue-300 transition-all duration-300"
            >
              View
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

.text-transparent {
  color: transparent;
}

.text-blue-100 {
  color: #ebf8ff;
}

.text-blue-200 {
  color: #bfdbfe;
}

.text-blue-300 {
  color: #93c5fd;
}
</style>