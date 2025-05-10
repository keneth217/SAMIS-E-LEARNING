import {createRouter, createWebHistory} from 'vue-router'

// Admin views
import AdminDashBoard from '@/views/admin/AdminDashBoard.vue'
import MyDashBoard from '@/views/admin/MyDashBoard.vue'
import AddCourse from '@/views/admin/Add-course.vue'
import CourseContent from '@/views/admin/CourseContent.vue'

// Student views
import StudentDashboard from '@/views/student/StudentDashboard.vue'
import StudentDashboardData from '@/views/student/StudentDashboardData.vue'
import EnrolledCourses from '@/views/student/EnrolledCourses.vue'

// Shared views
import HomeView from '../views/HomeView.vue'
import ViewCourseDetails from "@/views/student/ViewCourseDetails.vue";
import Teachers from "@/views/admin/Teachers.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                title: 'About'
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminDashBoard,
            // meta: {
            //     requiresAuth: true,
            //     role: 'admin',
            //     title: 'Admin Dashboard'
            // },
            children: [
                {
                    path: '',
                    name: 'admin.dashboard',
                    component: MyDashBoard,
                    meta: {
                        title: 'Dashboard Overview'
                    }
                },
                {
                    path: 'courses',
                    name: 'admin.courses',
                    component: CourseContent,
                    meta: {
                        title: 'Manage Courses'
                    }
                },
                {
                    path: 'teachers',
                    name: 'admin.teachers',
                    component: Teachers,
                    meta: {
                        title: 'Manage Teachers'
                    }
                },
                {
                    path: 'courses/add',
                    name: 'admin.courses.add',
                    component: AddCourse,
                    meta: {
                        title: 'Add New Course'
                    }
                }
            ]
        },
        {
            path: '/student',
            name: 'student',
            component: StudentDashboard,
            // meta: {
            //     requiresAuth: true,
            //     role: 'student',
            //     title: 'Student Dashboard'
            // },
            children: [
                {
                    path: '',
                    name: 'student.dashboard',
                    component: StudentDashboardData,
                    meta: {
                        title: 'My Dashboard'
                    }
                },
                {
                    path: 'enrolled-courses',
                    name: 'student.courses.enrolled',
                    component: EnrolledCourses,
                    meta: {
                        title: 'My Courses'
                    }
                },
                {
                    path: 'available-courses',
                    name: 'student.courses.available',
                    component: CourseContent,
                    meta: {
                        title: 'Available Courses'
                    }
                },
                {
                    path: 'course-details',
                    name: 'student.courses.details',
                    component: ViewCourseDetails,
                    meta: {
                        title: ' Courses Details'
                    }
                }
            ]
        },
        // 404 catch-all route
        {
            path: '/:pathMatch(.*)*',
            redirect: '/home'
        }
    ]
})

// Optional: Global navigation guard for authentication
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Samis E-Learning Platform'


    if (to.meta.requiresAuth) {
        const isAuthenticated = false
        if (!isAuthenticated) {
            return next({name: 'home'})
        }
    }

    next()
})

export default router