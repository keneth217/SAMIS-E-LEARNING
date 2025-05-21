<template>
  <div class="mx-auto w-full max-w-6xl px-4">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Lessons List -->
    <div v-if="!isLoading && lessons.length" class="space-y-4">
      <div
          v-for="lesson in lessons"
          :key="lesson.lessonID"
          @click="navigateToLesson(lesson.lessonID)"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div class="md:flex">
          <!-- Lesson Thumbnail -->
          <div class="md:w-1/3 p-4">
            <div class="relative video-thumbnail">
              <video
                  class="w-full h-full rounded-lg object-cover"
                  :src="videoUrls[lesson.lessonID] || ''"
                  :title="lesson.title"
                  playsinline
                  preload="metadata"
                  muted
              ></video>
            </div>
          </div>

          <!-- Lesson Details -->
          <div class="md:w-2/3 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ lesson.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ lesson.description }}</p>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              <p v-if="lesson.filename">File: {{ lesson.filename }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && !lessons.length" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No lessons available yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { LessonDAO } from "@/models/Lesson.ts";
import LessonService from "@/services/LessonService.ts";

const router = useRouter();

// State
const lessons = ref<LessonDAO[]>([]);
const videoUrls = ref<Record<number, string>>({});
const isLoading = ref(false);
const error = ref<string | null>(null);

// Fetch lessons from API
const fetchLessons = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await LessonService.listLessons();
    lessons.value = response;

    // Pre-generate video URLs for each lesson
    lessons.value.forEach(lesson => {
      if (lesson.filename) {
        videoUrls.value[lesson.lessonID] = LessonService.getVideoStreamUrl(lesson.filename);
      }
    });

  } catch (err: any) {
    error.value = err.message || 'Failed to load lessons';
    console.error('Error fetching lessons:', err);
  } finally {
    isLoading.value = false;
  }
};

const navigateToLesson = (lessonId: number) => {
  router.push({ name: 'lesson-detail', params: { id: lessonId } });
};

// Initial load
onMounted(async () => {
  await fetchLessons();
});
</script>

<style scoped>
.video-thumbnail {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  background-color: #000;
}

.video-thumbnail video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>