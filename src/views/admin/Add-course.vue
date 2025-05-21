<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-900 dark:text-white dark:border-2 dark:border-primary-100 rounded-sm shadow-md overflow-hidden">
    <div class="bg-blue-600 px-4 py-3">
      <h2 class="text-white font-semibold text-lg">ADD NEW VIDEO</h2>
    </div>

    <div class="p-6">
      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <!-- File Upload Area -->
      <div
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="handleDrop"
          :class="{'border-blue-500 bg-blue-50': dragOver, 'border-gray-300': !dragOver}"
          class="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p class="mt-2 text-sm text-gray-600">
          <span class="font-medium text-blue-600">Drag & drop</span> your video file here
        </p>
        <p class="text-xs text-gray-500 mt-1">or</p>
        <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            class="hidden"
            accept="video/*"
        >
        <button
            @click="fileInput?.click()"
            type="button"
            class="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse Files
        </button>
        <p v-if="form.file" class="mt-2 text-sm text-green-600">
          Selected: {{ (form.file as File).name }}
        </p>
        <p v-if="fileError" class="mt-2 text-sm text-red-600">
          {{ fileError }}
        </p>
      </div>

      <!-- Form Fields -->
      <div class="space-y-4">
        <div>
          <label class="form-labels">Title</label>
          <input
              v-model="form.title"
              type="text"
              class="form-input"
              placeholder="Enter video title"
              required
          >
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <div>
          <label class="form-labels">Description</label>
          <textarea
              v-model="form.description"
              rows="3"
              class="form-input"
              placeholder="Enter video description"
              required
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="mt-6 flex justify-end space-x-3">
        <button
            @click="resetForm"
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
            @click="submitForm"
            :disabled="!formValid || isSubmitting"
            :class="{
            'opacity-50 cursor-not-allowed': !formValid || isSubmitting,
            'hover:bg-blue-700': formValid && !isSubmitting
          }"
            class="submit-button"
        >
          <span v-if="isSubmitting">Uploading...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type {CreateLessonRequest} from "@/models/Lesson.ts";
import LessonService from "@/services/LessonService.ts";


// Form state
const form = ref<CreateLessonRequest>({
  file: null as unknown as File,
  title: '',
  description: ''
});

// UI state
const dragOver = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const fileError = ref<string | null>(null);

// Validation errors
const errors = ref({
  title: '',
  description: '',
  file: ''
});

// Form validation
const formValid = computed(() => {
  return form.value.title.trim() !== '' &&
      form.value.description.trim() !== '' &&
      form.value.file !== null;
});

// Handle file drop
const handleDrop = (e: DragEvent) => {
  dragOver.value = false;
  if (!e.dataTransfer?.files.length) return;

  const file = e.dataTransfer.files[0];
  validateAndSetFile(file);
};

// Handle file selection
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  validateAndSetFile(file);
};

// Validate and set the selected file
const validateAndSetFile = (file: File) => {
  // Reset previous errors
  fileError.value = null;

  // Check file type
  if (!file.type.startsWith('video/')) {
    fileError.value = 'Please upload a valid video file';
    return;
  }

  // Check file size (50MB limit)
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  if (file.size > MAX_SIZE) {
    fileError.value = 'File size must be less than 50MB';
    return;
  }

  // Set the valid file
  form.value.file = file;
};

// Submit the form
const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    const response = await LessonService.createLesson({
      file: form.value.file,
      title: form.value.title,
      description: form.value.description
    });

    successMessage.value = response.message;
    resetForm();
  } catch (error: any) {
    errorMessage.value = error.message;

    // Handle field-specific errors from API
    if (error.errors) {
      for (const [field, messages] of Object.entries(error.errors)) {
        if (field in errors.value) {
          errors.value[field as keyof typeof errors.value] = (messages as string[]).join(', ');
        }
      }
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Validate form fields
const validateForm = (): boolean => {
  let isValid = true;
  errors.value = { title: '', description: '', file: '' };

  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required';
    isValid = false;
  }

  if (!form.value.description.trim()) {
    errors.value.description = 'Description is required';
    isValid = false;
  }

  if (!form.value.file) {
    errors.value.file = 'Video file is required';
    isValid = false;
  }

  return isValid;
};

// Reset the form
const resetForm = () => {
  form.value = {
    file: null as unknown as File,
    title: '',
    description: ''
  };
  errors.value = { title: '', description: '', file: '' };
  fileError.value = null;

  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<style scoped>
.form-labels {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

.form-input {
  @apply mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white;
}

.submit-button {
  @apply px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>