<template>
  <div class="h-full">
    <div class="max-w-6xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div class="bg-blue-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-gray-800 dark:text-white font-bold text-xl tracking-wider">COURSE CONTENT</h2>
        <div class="flex space-x-3 ">
          <select
              v-model="selectedGrade"
              class="px-4 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">All Grades</option>
            <option v-for="grade in grades" :key="grade.id" :value="grade.id">
              {{ grade.name }}
            </option>
          </select>
          <select
              v-model="selectedCourse"
              class="px-4 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="">All Courses</option>
            <option v-for="course in filteredCourses" :key="course.id" :value="course.id">
              {{ course.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="p-6 ">
        <div v-if="selectedCourse && currentCourse" class="mb-8">
          <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Course Syllabus: {{ currentCourse.name }}</h3>
          <div class="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 class="font-medium text-blue-600 dark:text-blue-400 mb-3">Topics Covered:</h4>
            <ul class="space-y-2">
              <li v-for="topic in courseTopics" :key="topic.id" class="flex items-center">
                <div class="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-3"></div>
                <span>{{ topic.name }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Videos Section -->
        <div>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400">
              {{ selectedCourse ? `Videos for ${currentCourse?.name}` : 'All Course Videos' }}
            </h3>
            <div class="flex items-center w-full md:w-auto">
              <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Search videos"
                  class="w-full md:w-64 px-4 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
            </div>
          </div>

          <div v-if="filteredVideos.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-500">
            No videos found. Try adjusting your search or filters.
          </div>

          <div v-else class="space-y-5">
            <div v-for="video in filteredVideos" :key="video.id"
                 class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
              <div class="flex flex-col md:flex-row">
                <div class="bg-gray-100 dark:bg-gray-700 min-w-48 h-40 flex items-center justify-center relative overflow-hidden group">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="p-5 flex-1">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-lg text-gray-800 dark:text-white">{{ video.title }}</h4>
                    <span class="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">{{ video.length }} min</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">{{ video.description }}</p>
                  <div class="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div class="flex flex-wrap items-center gap-2">
                      <div class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                        {{ findTopicName(video.topic) }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <span class="inline-block h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-600 mr-2"></span>
                        {{ findTeacherName(video.teacher) }}
                      </div>
                    </div>
                    <router-link
                        to="/student/course-details"
                        class="text-sm px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-md text-center"
                    >
                      Watch Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';

const selectedGrade = ref('');
const selectedCourse = ref('');
const searchTerm = ref('');

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

const teachers = [
  {id: 'teacher-1', name: 'Dr. Sarah Johnson', subject: 'Mathematics'},
  {id: 'teacher-2', name: 'Prof. Michael Chen', subject: 'Computer Science'},
  {id: 'teacher-3', name: 'Ms. Emily Rodriguez', subject: 'Science'},
  {id: 'teacher-4', name: 'Mr. David Wilson', subject: 'History'}
];

// Sample video data
const videos = ref([
  {
    id: 'video-1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    length: 15,
    topic: 'algebra',
    course: 'math-6',
    grade: 'grade-6',
    teacher: 'teacher-1',
    videoUrl: 'https://example.com/videos/algebra-intro.mp4'
  },
  {
    id: 'video-2',
    title: 'Earth\'s Atmosphere',
    description: 'Exploring the layers and composition of Earth\'s atmosphere',
    length: 22,
    topic: 'earth-science',
    course: 'science-6',
    grade: 'grade-6',
    teacher: 'teacher-3',
    videoUrl: 'https://example.com/videos/earth-atmosphere.mp4'
  },
  {
    id: 'video-3',
    title: 'Programming with Python',
    description: 'Introduction to programming concepts using Python',
    length: 30,
    topic: 'programming',
    course: 'cs-9',
    grade: 'grade-9',
    teacher: 'teacher-2',
    videoUrl: 'https://example.com/videos/python-basics.mp4'
  },
  {
    id: 'video-4',
    title: 'Arrays and Linked Lists',
    description: 'Understanding fundamental data structures in programming',
    length: 25,
    topic: 'data-struct',
    course: 'cs-10',
    grade: 'grade-10',
    teacher: 'teacher-2',
    videoUrl: 'https://example.com/videos/data-structures.mp4'
  }
]);

const filteredCourses = computed(() => {
  if (!selectedGrade.value) return courses;
  return courses.filter(course => course.gradeId === selectedGrade.value);
});

const currentCourse = computed(() => {
  if (!selectedCourse.value) return null;
  return courses.find(course => course.id === selectedCourse.value);
});

const courseTopics = computed(() => {
  if (!selectedCourse.value) return [];
  return topics.filter(topic => topic.courseId === selectedCourse.value);
});

const filteredVideos = computed(() => {
  let result = videos.value;

  if (selectedGrade.value) {
    result = result.filter(video => video.grade === selectedGrade.value);
  }

  if (selectedCourse.value) {
    result = result.filter(video => video.course === selectedCourse.value);
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter(video =>
        video.title.toLowerCase().includes(term) ||
        video.description.toLowerCase().includes(term)
    );
  }

  return result;
});

const findTopicName = (topicId) => {
  const topic = topics.find(t => t.id === topicId);
  return topic ? topic.name : 'Unknown Topic';
};

const findTeacherName = (teacherId) => {
  const teacher = teachers.find(t => t.id === teacherId);
  return teacher ? teacher.name : 'Unknown Teacher';
};

onMounted(() => {
  console.log('Component mounted');
  // fetchData();
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(59, 130, 246, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) rgba(59, 130, 246, 0.1);
}
</style>