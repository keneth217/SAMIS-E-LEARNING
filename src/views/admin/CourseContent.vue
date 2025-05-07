// CourseContent.vue
<template>
  <div class="max-w-6xl mx-auto bg-white rounded-sm shadow-md overflow-hidden">
    <div class="bg-blue-600 px-4 py-3 flex justify-between items-center">
      <h2 class="text-white font-semibold text-lg">COURSE CONTENT</h2>
      <div class="flex space-x-2">
        <select
            v-model="selectedGrade"
            class="px-3 py-1 rounded text-sm"
        >
          <option value="">All Grades</option>
          <option v-for="grade in grades" :key="grade.id" :value="grade.id">
            {{ grade.name }}
          </option>
        </select>
        <select
            v-model="selectedCourse"
            class="px-3 py-1 rounded text-sm"
        >
          <option value="">All Courses</option>
          <option v-for="course in filteredCourses" :key="course.id" :value="course.id">
            {{ course.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="p-6">
      <!-- Syllabus Section -->
      <div v-if="selectedCourse && currentCourse" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-3">Course Syllabus: {{ currentCourse.name }}</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-700 mb-2">Topics Covered:</h4>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="topic in courseTopics" :key="topic.id">{{ topic.name }}</li>
          </ul>
        </div>
      </div>

      <!-- Videos Section -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">
            {{ selectedCourse ? `Videos for ${currentCourse?.name}` : 'All Course Videos' }}
          </h3>
          <div class="flex items-center">
            <input
                v-model="searchTerm"
                type="text"
                placeholder="Search videos"
                class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        </div>

        <div v-if="filteredVideos.length === 0" class="text-center py-8 text-gray-500">
          No videos found. Try adjusting your search or filters.
        </div>

        <div v-else class="space-y-4">
          <div v-for="video in filteredVideos" :key="video.id"
               class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="flex">
              <div class="bg-gray-200 w-48 h-32 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="p-4 flex-1">
                <div class="flex justify-between">
                  <h4 class="font-medium text-lg text-gray-800">{{ video.title }}</h4>
                  <span class="text-sm text-gray-500">{{ video.length }} min</span>
                </div>
                <p class="text-gray-600 text-sm mt-1">{{ video.description }}</p>
                <div class="mt-3 flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {{ findTopicName(video.topic) }}
                    </div>
                    <span class="mx-2 text-gray-400">|</span>
                    <div class="text-xs text-gray-500">
                      {{ findTeacherName(video.teacher) }}
                    </div>
                  </div>
                  <button
                      @click="watchVideo(video)"
                      class="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Watch
                  </button>
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

const watchVideo = (video) => {
  console.log('Watching video:', video);
  alert(`Now playing: ${video.title}`);
  // Implement video playing functionality here
};

// In a real app, we would fetch data from an API
onMounted(() => {
  console.log('Component mounted');
  // fetchData();
});
</script>