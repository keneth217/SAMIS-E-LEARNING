<template>
  <div class="my-dashboard">
    <h1>My Dashboard</h1>
    <p>Welcome to your personalized dashboard!</p>
  </div>

  <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
    <div class="p-4 shadow-sm rounded-sm  bg-blue-400">
      <h1>Total Courses</h1>
      <p>100</p>
    </div>

    <div class="p-4 shadow-sm rounded-sm  bg-blue-400">
      <h1>Total Courses</h1>
      <p>100</p>
    </div>
    <div class="p-4 shadow-sm rounded-sm  bg-blue-400">
      <h1>Total Courses</h1>
      <p>100</p>
    </div>

  </div>
  <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 cursor-pointer">
    <router-link to="/dash/add-course" class="p-4 shadow-sm rounded-sm  bg-blue-400  ">
      <h1>Add New Course</h1>

    </router-link>

  </div>

</template>

<script setup lang="ts">


</script>
<style scoped>

</style>