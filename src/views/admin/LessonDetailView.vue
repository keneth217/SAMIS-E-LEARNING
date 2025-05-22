<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-8">
    <!-- Back Button -->
    <button
        @click="goBack"
        class="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"/>
      </svg>
      Back to Lessons
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Lesson Content -->
    <div v-if="!isLoading && lesson" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div class="md:flex">

        <div class="w-full p-4">
          <div class="relative video-container">
            <video
                ref="videoPlayer"
                class="w-full h-full rounded-lg"
                :src="videoUrl"
                :title="lesson.title"
                controls
                controlsList="nodownload"
                oncontextmenu="return false"
                playsinline
                preload="auto"
                @loadedmetadata="handleVideoLoaded"

                poster="/data.jpg"
            >
            </video>
          </div>
        </div>
      </div>

      <!-- Lesson Details -->
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ lesson.title }}</h1>
        <p class="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line">{{ lesson.description }}</p>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p v-if="lesson.filename"><span class="font-medium">File:</span> {{ lesson.filename }}</p>
            <p><span class="font-medium">Created:</span> {{ formatDate(lesson.createdAt) }}</p>
          </div>
          <div class="mt-4">
            <button
                @click="showDeleteModal = true"
                class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Delete Lesson
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-6">Are you sure you want to delete this lesson? This action cannot be undone.</p>

        <div class="flex justify-end space-x-3">
          <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              :disabled="isDeleting"
          >
            <span v-if="isDeleting">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-if="!isLoading && !lesson" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">Lesson not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import type {LessonDAO} from "@/models/Lesson.ts";
import LessonService from "@/services/LessonService.ts";

const route = useRoute();
const router = useRouter();

// State
const lesson = ref<LessonDAO | null>(null);
const isLoading = ref(false);
const isDeleting = ref(false);
const error = ref<string | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const showDeleteModal = ref(false);

const videoUrl = computed(() => {
  return lesson.value?.filename ? LessonService.getVideoStreamUrl(lesson.value.filename) : '';
});

// Fetch lesson details
const fetchLesson = async (id: number) => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await LessonService.getLessonById(id);
    lesson.value = response;
  } catch (err: any) {
    error.value = err.message || 'Failed to load lesson details';
    console.error('Error fetching lesson:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleVideoLoaded = () => {
  console.log('Video metadata loaded');
  if (videoPlayer.value) {
    videoPlayer.value.play();
  }
};

const confirmDelete = async () => {
  if (!lesson.value) return;

  isDeleting.value = true;
  try {
    await LessonService.deleteLesson(lesson.value.lessonID);
    console.log(lesson.value.lessonID);
    console.log('Lesson deleted successfully');
    router.push({name: 'lessons-list'});
  } catch (err: any) {
    error.value = err.message || 'Failed to delete lesson';
    console.error('Error deleting lesson:', err);
  } finally {
    isDeleting.value = false;
    showDeleteModal.value = false;
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const goBack = () => {
  router.push({name: 'lessons-list'});
};

// Initial load
onMounted(async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    error.value = 'Invalid lesson ID';
    return;
  }
  await fetchLesson(id);
});
</script>

<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  background-color: #000;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>