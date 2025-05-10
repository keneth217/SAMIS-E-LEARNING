<template>
  <div class="mx-auto  w-full">
    <div class="p-4 mb-6">
      <div class="relative video-container">
        <video
            class="w-full h-full rounded-lg shadow-lg object-cover"
            src="@/assets/video/grade7_math_4.mp4"
            title="YouTube video player"
            controls
            playsinline
        >

        </video>
      </div>
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
      <div class="lg:col-span-2">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2 dark:text-white">{{ course.title }}</h1>
          <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 gap-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"></path>
              </svg>
              {{ course.duration }}
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"></path>
              </svg>
              Last updated: {{ course.lastUpdated }}
            </span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{{ course.level }}</span>
          </div>
        </div>

        <div class="prose max-w-none mb-8">
          <h2 class="text-xl font-semibold mb-4">About This Course</h2>
          <p class="text-gray-700  dark:text-gray-400 mb-4">{{ course.description }}</p>
          <p class="text-gray-700 dark:text-gray-400 ">{{ course.longDescription }}</p>
        </div>

        <div class="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-900">What You'll Learn</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li v-for="(item, index) in learningOutcomes" :key="index" class="flex items-start">
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Course Content</h2>
          <div class="border rounded-lg overflow-hidden">
            <div v-for="(module, index) in courseModules" :key="index" class="border-b last:border-b-0">
              <button @click="toggleModule(index)"
                      class="w-full px-4 py-3 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
                <span>{{ module.title }}</span>
                <svg class="w-5 h-5 text-gray-500 transform" :class="{ 'rotate-180': module.isOpen }" fill="none"
                     stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-if="module.isOpen" class="px-4 py-2 bg-white">
                <div v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex"
                     class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                  <svg class="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  </svg>
                  <span class="text-gray-700">{{ lesson.title }}</span>
                  <span class="ml-auto text-sm text-gray-500">{{ lesson.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">Instructor</h2>
          <div class="flex items-center mb-4">
            <img :src="course.instructor.avatar" :alt="course.instructor.name" class="w-12 h-12 rounded-full mr-4">
            <div>
              <h3 class="font-medium">{{ course.instructor.name }}</h3>
              <p class="text-sm text-gray-600">{{ course.instructor.title }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 mb-4">{{ course.instructor.bio }}</p>
          <button
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition-colors">
            View Profile
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium mb-3 transition-colors">
            Continue Learning
          </button>
          <button
              class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-md font-medium transition-colors">
            Save for Later
          </button>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4">Resources</h2>
          <ul class="space-y-3">
            <li v-for="(resource, index) in resources" :key="index">
              <a href="#" class="flex items-center text-blue-600 hover:text-blue-800">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                {{ resource.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'

const course = reactive({
  title: "Advanced JavaScript Patterns",
  duration: "45 min",
  lastUpdated: "May 2023",
  level: "Intermediate",
  description: "Dive deep into advanced JavaScript patterns that will elevate your coding skills. This course covers design patterns, performance optimization techniques, and modern JS features used by senior developers.",
  longDescription: "You'll learn through practical examples, real-world scenarios, and hands-on exercises that will immediately improve the quality and maintainability of your code.",
  instructor: {
    name: "Sarah Johnson",
    title: "Senior JavaScript Developer",
    bio: "Sarah has 10+ years of experience building complex web applications and mentoring developers.",
    avatar: "https://placehold.co/80x80/3b82f6/white?text=Instructor"
  }
})

const learningOutcomes = [
  "Module and Revealing Module patterns",
  "Observer and Pub/Sub patterns",
  "Performance optimization techniques",
  "Modern ES6+ features in practice"
]

const courseModules = reactive([
  {
    title: "Module 1: JavaScript Design Patterns",
    isOpen: true,
    lessons: [
      {title: "1. Introduction to Design Patterns", duration: "12:45"}
    ]
  }
])

const resources = [
  {title: "Course Slides (PDF)"},
  {title: "Exercise Files"}
]

const toggleModule = (index) => {
  courseModules[index].isOpen = !courseModules[index].isOpen
}
</script>

<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  height: 500px;
  width: 100%;
}

</style>