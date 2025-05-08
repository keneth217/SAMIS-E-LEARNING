<template>
  <div class=" shadow-sm rounded-md p-6 bg-white dark:bg-gray-700">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Enrolled Courses</h1>
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-700  dark:text-white">Current Courses and Progress</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


        <div class="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <img
              src="https://placehold.co/400x200/f59e0b/white?text=Course+Image"
              alt="Course Image"
              class="w-full h-40 object-cover"
          />
          <div class="p-4 flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Mobile App Development</h3>
            <div class="mb-3">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 90%"></div>
              </div>
              <p class="text-sm text-gray-600 mt-1">Progress: 90%</p>
            </div>
            <p class="text-sm text-gray-600 mb-4">Status: <span class="text-yellow-600">Almost Done</span></p>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Continue Learning
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">


</script>
<style scoped>

</style>