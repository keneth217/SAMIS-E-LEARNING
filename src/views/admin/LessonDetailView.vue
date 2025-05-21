<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-8">
    <!-- Back Button -->
    <button
        @click="goBack"
        class="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
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
        <!-- Video Player -->
        <div class="w-full p-4">
          <div class="relative video-container">
            <video
                ref="videoPlayer"
                class="w-full h-full rounded-lg"
                :src="videoUrl"
                :title="lesson.title"
                controls
                playsinline
                preload="auto"
                @loadedmetadata="handleVideoLoaded"
            ></video>
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
            <!-- Add more lesson details as needed -->
          </div>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LessonDAO } from "@/models/Lesson.ts";
import LessonService from "@/services/LessonService.ts";

const route = useRoute();
const router = useRouter();

// State
const lesson = ref<LessonDAO | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);

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
  // You can access video duration, etc. here if needed
  // const duration = videoPlayer.value?.duration;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const goBack = () => {
  router.push({ name: 'lessons-list' });
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