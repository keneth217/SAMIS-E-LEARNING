<script setup lang="ts">
// import { ref } from 'vue'
//
// // Features content
// const features = [
//   {
//     title: 'Interactive Learning',
//     description: 'Engage with dynamic course materials designed for maximum retention.',
//     icon: '📚'
//   },
//   {
//     title: 'Expert Instructors',
//     description: 'Learn from industry professionals with real-world experience.',
//     icon: '👩‍🏫'
//   },
//   {
//     title: 'Flexible Schedule',
//     description: 'Study at your own pace with 24/7 access to course materials.',
//     icon: '🕒'
//   }
// ]
//
// // Testimonial content
// const testimonials = [
//   {
//     text: "This platform transformed my learning experience. The courses are well-structured and easy to follow.",
//     author: "Sarah Johnson",
//     role: "Student"
//   }
// ]
//
// // Available courses preview
// const featuredCourses = [
//   {
//     title: "Introduction to Programming",
//     level: "Beginner",
//     lessons: 12
//   },
//   {
//     title: "Data Science Fundamentals",
//     level: "Intermediate",
//     lessons: 18
//   }
// ]
</script>

<template>
<!--  <main class="min-h-screen bg-gray-50">-->
<!--    &lt;!&ndash; Hero Section &ndash;&gt;-->
<!--    <section class="py-20 px-6 max-w-6xl mx-auto text-center">-->
<!--      <h1 class="text-4xl font-light text-gray-800 mb-6">Discover Your Learning Potential</h1>-->
<!--      <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">-->
<!--        A thoughtfully designed learning experience that helps you master new skills at your own pace.-->
<!--      </p>-->
<!--      <div class="flex justify-center gap-4">-->
<!--        <button class="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 transition">-->
<!--          Browse Courses-->
<!--        </button>-->
<!--        <button class="bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded hover:bg-gray-50 transition">-->
<!--          Learn More-->
<!--        </button>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Features Section &ndash;&gt;-->
<!--    <section class="py-16 bg-white">-->
<!--      <div class="max-w-6xl mx-auto px-6">-->
<!--        <h2 class="text-3xl font-light text-center text-gray-800 mb-12">How We Support Your Learning Journey</h2>-->
<!--        <div class="grid md:grid-cols-3 gap-10">-->
<!--          <div v-for="(feature, index) in features" :key="index" class="text-center p-6 rounded bg-gray-50">-->
<!--            <div class="text-4xl mb-4">{{ feature.icon }}</div>-->
<!--            <h3 class="text-xl font-medium text-gray-800 mb-3">{{ feature.title }}</h3>-->
<!--            <p class="text-gray-600">{{ feature.description }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Featured Courses &ndash;&gt;-->
<!--    <section class="py-16 bg-gray-50">-->
<!--      <div class="max-w-6xl mx-auto px-6">-->
<!--        <h2 class="text-3xl font-light text-center text-gray-800 mb-6">Featured Courses</h2>-->
<!--        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">-->
<!--          Start your learning journey with our most popular courses-->
<!--        </p>-->
<!--        <div class="grid md:grid-cols-2 gap-8">-->
<!--          <div v-for="(course, index) in featuredCourses" :key="index"-->
<!--               class="bg-white p-6 rounded shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition">-->
<!--            <h3 class="text-xl font-medium text-gray-800 mb-2">{{ course.title }}</h3>-->
<!--            <div class="flex items-center text-sm text-gray-500 mb-4">-->
<!--              <span class="mr-4">{{ course.level }}</span>-->
<!--              <span>{{ course.lessons }} lessons</span>-->
<!--            </div>-->
<!--            <button class="text-emerald-600 font-medium hover:underline">View Course →</button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="text-center mt-10">-->
<!--          <button class="border border-emerald-600 text-emerald-600 px-6 py-3 rounded hover:bg-emerald-50 transition">-->
<!--            View All Courses-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Testimonial &ndash;&gt;-->
<!--    <section class="py-16 bg-white">-->
<!--      <div class="max-w-4xl mx-auto px-6">-->
<!--        <h2 class="text-3xl font-light text-center text-gray-800 mb-12">What Our Students Say</h2>-->
<!--        <div class="bg-gray-50 p-8 rounded text-center">-->
<!--          <p class="text-lg text-gray-700 italic mb-6">-->
<!--            "{{ testimonials[0].text }}"-->
<!--          </p>-->
<!--          <div>-->
<!--            <p class="font-medium text-gray-800">{{ testimonials[0].author }}</p>-->
<!--            <p class="text-gray-600 text-sm">{{ testimonials[0].role }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; CTA Section &ndash;&gt;-->
<!--    <section class="py-16 bg-emerald-50">-->
<!--      <div class="max-w-4xl mx-auto px-6 text-center">-->
<!--        <h2 class="text-3xl font-light text-gray-800 mb-6">Ready to Begin?</h2>-->
<!--        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">-->
<!--          Join thousands of students already learning on our platform-->
<!--        </p>-->
<!--        <button class="bg-emerald-600 text-white px-8 py-3 rounded hover:bg-emerald-700 transition">-->
<!--          Start Learning Today-->
<!--        </button>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Footer &ndash;&gt;-->
<!--    <footer class="py-12 bg-gray-800 text-gray-300">-->
<!--      <div class="max-w-6xl mx-auto px-6">-->
<!--        <div class="grid md:grid-cols-4 gap-8">-->
<!--          <div>-->
<!--            <h3 class="text-lg font-medium text-white mb-4">Learning Platform</h3>-->
<!--            <p class="text-sm mb-4">Empowering minds through accessible education.</p>-->
<!--          </div>-->
<!--          <div>-->
<!--            <h4 class="text-white mb-4">Courses</h4>-->
<!--            <ul class="space-y-2 text-sm">-->
<!--              <li><a href="#" class="hover:text-white transition">All Courses</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Featured</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Categories</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div>-->
<!--            <h4 class="text-white mb-4">Company</h4>-->
<!--            <ul class="space-y-2 text-sm">-->
<!--              <li><a href="#" class="hover:text-white transition">About Us</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Instructors</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Contact</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div>-->
<!--            <h4 class="text-white mb-4">Support</h4>-->
<!--            <ul class="space-y-2 text-sm">-->
<!--              <li><a href="#" class="hover:text-white transition">Help Center</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>-->
<!--              <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="border-t border-gray-700 mt-12 pt-8 text-sm text-center">-->
<!--          <p>&copy; 2025 Learning Platform. All rights reserved.</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </footer>-->
<!--  </main>-->
</template>