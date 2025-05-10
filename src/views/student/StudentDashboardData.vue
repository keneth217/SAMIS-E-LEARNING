<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <div class="container mx-auto px-6 py-8">
      <!-- Welcome section -->
      <div class="mb-10">
        <h2 class="text-2xl font-medium">Welcome back, Student</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Track your learning progress and upcoming activities</p>
      </div>

      <!-- Stats overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Enrolled Courses</p>
              <p class="text-2xl font-semibold mt-2">4</p>
              <p class="text-xs text-blue-500 mt-1">2 in progress</p>
            </div>
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</p>
              <p class="text-2xl font-semibold mt-2">68%</p>
              <p class="text-xs text-green-500 mt-1">↑ 12% this month</p>
            </div>
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Assignments</p>
              <p class="text-2xl font-semibold mt-2">3</p>
              <p class="text-xs text-red-500 mt-1">1 due soon</p>
            </div>
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Achievements</p>
              <p class="text-2xl font-semibold mt-2">8</p>
              <p class="text-xs text-yellow-500 mt-1">2 new badges!</p>
            </div>
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- My courses section -->
      <div class="mb-10">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium">My Courses</h3>
          <router-link to="/student/available-courses" class="text-sm text-blue-500 hover:underline flex items-center">
            Browse more courses
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-900">
            <div class="h-40 bg-blue-400 dark:bg-blue-900 relative">
              <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                In Progress • 68%
              </div>
            </div>
            <div class="p-6">
              <h4 class="font-medium text-lg mb-2">Web Development Fundamentals</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn HTML, CSS, and JavaScript to build modern websites</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                    <span class="text-xs font-medium">JD</span>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Instructor: John Doe</span>
                </div>
                <router-link to="/student/course-details" class="text-xs text-blue-500 hover:underline">Continue</router-link>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-900">
            <div class="h-40 bg-purple-400 dark:bg-purple-900 relative">
              <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                In Progress • 42%
              </div>
            </div>
            <div class="p-6">
              <h4 class="font-medium text-lg mb-2">Data Science Essentials</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Master data analysis, visualization and machine learning fundamentals</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                    <span class="text-xs font-medium">AL</span>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Instructor: Alice Lee</span>
                </div>
                <router-link to="/student/course-details" class="text-xs text-blue-500 hover:underline">Continue</router-link>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-900">
            <div class="h-40 bg-green-400 dark:bg-green-900 relative">
              <div class="absolute top-4 right-4 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                Completed • 100%
              </div>
            </div>
            <div class="p-6">
              <h4 class="font-medium text-lg mb-2">Introduction to Python</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Comprehensive introduction to Python programming language</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                    <span class="text-xs font-medium">RJ</span>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Instructor: Robert Johnson</span>
                </div>
                <router-link to="/student/available-courses" class="text-xs text-blue-500 hover:underline">Review</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Upcoming deadlines -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-2">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Upcoming Deadlines</h3>
            <router-link to="/student/course-details" class="text-sm text-blue-500 hover:underline">View Calendar</router-link>
          </div>
          <div class="space-y-4">
            <div class="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <div class="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mr-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-medium">Data Analysis Assignment</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Data Science Essentials • Due Tomorrow</p>
              </div>
              <div>
                <router-link to="/student/course-details" class="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Start
                </router-link>
              </div>
            </div>

            <div class="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <div class="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-4 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-medium">JavaScript Mini-Project</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Web Development Fundamentals • Due in 3 days</p>
              </div>
              <div>
                <router-link to="/assignments/js-project" class="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Start
                </router-link>
              </div>
            </div>

            <div class="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <div class="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-medium">Course Feedback</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Introduction to Python • Due in 5 days</p>
              </div>
              <div>
                <router-link to="/feedback/python" class="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Start
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Learning Progress -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Learning Progress</h3>
          </div>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium">Web Development</span>
                <span class="text-xs text-gray-500">68%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 68%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium">Data Science</span>
                <span class="text-xs text-gray-500">42%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: 42%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium">Python</span>
                <span class="text-xs text-gray-500">100%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
              </div>
            </div>

            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-6">
              <h4 class="font-medium text-sm mb-2">Learning Recommendation</h4>
              <p class="text-xs text-gray-600 dark:text-gray-400">Complete the JavaScript section in your Web Development course to unlock the next module.</p>
              <button class="mt-3 text-xs px-3 py-1.5 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 transition-colors">
                Go to JavaScript Module
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>