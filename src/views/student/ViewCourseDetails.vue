<template>
  <div class="mx-auto w-full max-w-6xl px-4">
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-if="error" class="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <div v-if="!isLoading && lessons.length" class="space-y-8">
      <div
          v-for="lesson in lessons"
          :key="lesson.lessonID"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div class="md:flex">
          <div class="md:w-2/3 p-4">
            <div class="relative video-container">
              <video
                  ref="videoPlayer"
                  class="w-full h-full rounded-lg object-cover"
                  :src="videoUrls[lesson.lessonID] || ''"
                  :title="lesson.title"
                  controls
                  playsinline
                  preload="metadata"
                  @loadedmetadata="handleVideoLoaded(lesson.lessonID)"
              ></video>
            </div>
          </div>

          <div class="md:w-1/3 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ lesson.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ lesson.description }}</p>
            <button
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                @click="showDeleteDialog(lesson.lessonID)"
            >
              Delete Lesson
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && !lessons.length" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No lessons available yet.</p>
    </div>

    <div v-if="deleteDialogVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-6">Are you sure you want to delete this lesson?</p>
        <div class="flex justify-end space-x-4">
          <button
              class="px-4 py-2 border border-gray-300 rounded"
              @click="closeDeleteDialog"
          >
            Cancel
          </button>
          <button
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              @click="confirmDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {LessonDAO} from "@/models/Lesson.ts";
import LessonService from "@/services/LessonService.ts";

const lessons = ref<LessonDAO[]>([]);
const videoUrls = ref<Record<number, string>>({});
const isLoading = ref(false);
const error = ref<string | null>(null);
const deleteDialogVisible = ref(false);
const lessonToDelete = ref<number | null>(null);

const fetchLessons = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await LessonService.listLessons();
    lessons.value = response;
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

const showDeleteDialog = (lessonId: number) => {
  lessonToDelete.value = lessonId;
  deleteDialogVisible.value = true;
};

const closeDeleteDialog = () => {
  deleteDialogVisible.value = false;
  lessonToDelete.value = null;
};

const confirmDelete = async () => {
  if (lessonToDelete.value) {
    try {
      const response= await LessonService.deleteLesson(lessonToDelete.value);
      lessons.value = response
      closeDeleteDialog();
    } catch (err) {
      error.value = 'Failed to delete lesson';
      console.error('Error deleting lesson:', err);
    }
  }
};

const handleVideoLoaded = (lessonId: number) => {
  console.log(`Video for lesson ${lessonId} is ready`);
};

onMounted(async () => {
  await fetchLessons();
});
</script>

<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
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

@media (max-width: 767px) {
  .video-container {
    padding-bottom: 75%;
  }
}
</style>