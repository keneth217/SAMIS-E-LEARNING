// AddVideo.vue
<template>
  <div class="max-w-md mx-auto bg-white rounded-sm shadow-md overflow-hidden">
    <div class="bg-blue-600 px-4 py-3">
      <h2 class="text-white font-semibold text-lg">ADD NEW VIDEO</h2>
    </div>

    <div class="p-6">
      <div
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="handleDrop"
          :class="{'border-blue-500 bg-blue-50': dragOver, 'border-gray-300': !dragOver}"
          class="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
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
            @click="fileInput.value.click()"
            type="button"
            class="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse Files
        </button>
        <p v-if="selectedFile" class="mt-2 text-sm text-green-600">
          Selected: {{ selectedFile.name }}
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
              v-model="form.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video title"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video description"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Video URL (Optional)</label>
          <input
              v-model="form.videoUrl"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video URL"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Video Length (minutes)</label>
          <input
              v-model="form.length"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video length"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
          <select
              v-model="form.teacher"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select teacher</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }} ({{ teacher.subject }})
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Grade/Class</label>
          <select
              v-model="form.grade"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select grade</option>
            <option v-for="grade in grades" :key="grade.id" :value="grade.id">
              {{ grade.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
              v-model="form.course"
              :disabled="!form.grade"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="" disabled selected>Select a course</option>
            <option v-for="course in filteredCourses" :key="course.id" :value="course.id">
              {{ course.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Topic</label>
          <select
              v-model="form.topic"
              :disabled="!form.course"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="" disabled selected>Select a topic</option>
            <option v-for="topic in filteredTopics" :key="topic.id" :value="topic.id">
              {{ topic.name }}
            </option>
          </select>
        </div>

        <div class="flex items-center">
          <input
              v-model="form.visibility"
              id="visibility"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label for="visibility" class="ml-2 block text-sm text-gray-700">
            Make video public
          </label>
        </div>
      </div>

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
            :disabled="!formValid"
            :class="{'opacity-50 cursor-not-allowed': !formValid, 'hover:bg-blue-700': formValid}"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, reactive} from 'vue';

const dragOver = ref(false);
const selectedFile = ref(null);
const fileInput = ref(null);

const form = reactive({
  title: '',
  description: '',
  videoUrl: '',
  length: '',
  teacher: '',
  grade: '',
  course: '',
  topic: '',
  visibility: true
});

const teachers = [
  {id: 'teacher-1', name: 'Dr. Sarah Johnson', subject: 'Mathematics'},
  {id: 'teacher-2', name: 'Prof. Michael Chen', subject: 'Computer Science'},
  {id: 'teacher-3', name: 'Ms. Emily Rodriguez', subject: 'Science'},
  {id: 'teacher-4', name: 'Mr. David Wilson', subject: 'History'}
];

const grades = [
  {id: 'grade-6', name: 'Grade 6'},
  {id: 'grade-7', name: 'Grade 7'},
  {id: 'grade-8', name: 'Grade 8'},
  {id: 'grade-9', name: 'Grade 9'},
  {id: 'grade-10', name: 'Grade 10'}
];

const courses = [
  {id: 'math-6', gradeId: 'grade-6', name: 'Mathematics 6'},
  {id: 'science-6', gradeId: 'grade-6', name: 'Science 6'},
  {id: 'math-7', gradeId: 'grade-7', name: 'Mathematics 7'},
  {id: 'science-7', gradeId: 'grade-7', name: 'Science 7'},
  {id: 'history-8', gradeId: 'grade-8', name: 'History 8'},
  {id: 'cs-9', gradeId: 'grade-9', name: 'Computer Science 9'},
  {id: 'cs-10', gradeId: 'grade-10', name: 'Computer Science 10'}
];

const topics = [
  {id: 'algebra', courseId: 'math-6', name: 'Basic Algebra'},
  {id: 'geometry', courseId: 'math-6', name: 'Geometry Fundamentals'},
  {id: 'earth-science', courseId: 'science-6', name: 'Earth Science'},
  {id: 'life-science', courseId: 'science-6', name: 'Life Science'},
  {id: 'algebra-adv', courseId: 'math-7', name: 'Advanced Algebra'},
  {id: 'programming', courseId: 'cs-9', name: 'Programming Basics'},
  {id: 'data-struct', courseId: 'cs-10', name: 'Data Structures'}
];

const filteredCourses = computed(() => {
  if (!form.grade) return [];
  return courses.filter(course => course.gradeId === form.grade);
});

const filteredTopics = computed(() => {
  if (!form.course) return [];
  return topics.filter(topic => topic.courseId === form.course);
});

const formValid = computed(() => {
  return (
      form.title.trim() !== '' &&
      form.grade &&
      form.course &&
      form.topic &&
      form.teacher &&
      form.length &&
      (selectedFile.value || form.videoUrl.trim() !== '')
  );
});

const handleDrop = (e) => {
  dragOver.value = false;
  const files = e.dataTransfer.files;
  if (files.length && files[0].type.startsWith('video/')) {
    selectedFile.value = files[0];
  } else {
    alert('Please upload a valid video file');
  }
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files.length && files[0].type.startsWith('video/')) {
    selectedFile.value = files[0];
  }
};

const submitForm = () => {
  if (!formValid.value) return;

  const formData = new FormData();
  if (selectedFile.value) {
    formData.append('video', selectedFile.value);
  }

  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('videoUrl', form.videoUrl);
  formData.append('length', form.length);
  formData.append('teacher', form.teacher);
  formData.append('grade', form.grade);
  formData.append('course', form.course);
  formData.append('topic', form.topic);
  formData.append('visibility', form.visibility);

  console.log('Form submitted:', Object.fromEntries(formData));

  resetForm();
  alert('Video uploaded successfully!');
};

const resetForm = () => {
  selectedFile.value = null;
  form.title = '';
  form.description = '';
  form.videoUrl = '';
  form.length = '';
  form.teacher = '';
  form.grade = '';
  form.course = '';
  form.topic = '';
  form.visibility = true;

  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

