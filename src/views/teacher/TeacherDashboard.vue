<template>


  <div class="h-full">
    <div class="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 dark:border-primary-100 dark:border-2 rounded-lg shadow-lg">
      <div :class="isSidebarCollapsed ? 'w-16' : 'w-60'"
           class="sidebar-content ">
        <div class="mt-20">
          <hr class="border-0 border-t border-white dark:border-gray-600"/>
        </div>
        <ul class="sidebar-lists">
          <li
              v-for="link in links"
              :key="link.label"
              class="flex flex-col"
              @click="navigateTo(link.route)">
            <div class="sidebar-links" :class="{ active: isLinkActive(link) }">
              <component
                  :is="iconComponents[link.icon]"
                  class="h-6 w-6 mr-4"
                  v-if="iconComponents[link.icon]"
              />
              <span v-if="!isSidebarCollapsed">{{ link.label }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex-1 flex flex-col transition-all duration-300 w-full">
        <header
            class="header-container  dark:bg-gray-700 shadow"
            :class="{
            'md:left-16 md:w-[calc(100%-4rem)]': isSidebarCollapsed,
            'md:left-60 md:w-[calc(100%-15rem)]': !isSidebarCollapsed
          }"
        >
          <div class="container flex items-center justify-between h-full px-4">
            <div class="flex items-center gap-4">
              <div class="text-2xl cursor-pointer hidden md:block" @click="toggleSidebar">
                <Bars3Icon class="h-6 w-6 mr-8 text-black dark:text-white cursor-pointer"/>
              </div>
              <p class="text-sm md:text-xl font-bold font-serif text-center capitalize text-black dark:text-white">
                SAMIS
              </p>
            </div>
            <div class="flex items-center gap-6">
              <ThemeToggle/>
              <div
                  class="flex items-center cursor-pointer relative mr-4 md:mr-20 text-black dark:text-white"
                  @click="toggleUserDropdown"
                  @mouseenter="isDesktop && (isUserDropdownOpen = true)"
                  @mouseleave="isDesktop && (isUserDropdownOpen = false)"
              >
                <p class="capitalize text-xl">KENETH</p>
                <ChevronDownIcon
                    class="h-4 w-4 cursor-pointer font-bold md:ml-4 text-blue-900 dark:text-white"
                    :class="{ 'rotate-180': isUserDropdownOpen }"
                />
                <ul
                    :class="{
                    'max-h-0 opacity-0': !isUserDropdownOpen,
                    'max-h-80 opacity-200': isUserDropdownOpen,
                  }"
                    class="user-profile-dropdown bg-white dark:bg-gray-700 dark:text-white shadow-lg"
                >
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600" @click="navigateTo('/profile')">
                    Profile
                  </li>
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600"
                      @click="navigateTo('/dash/setting')">
                    Settings
                  </li>
                  <hr class="border-0 border-t border-gray-500"/>
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600" @click="navigateTo('/setting')">
                    Terms Of Service
                  </li>
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600" @click="navigateTo('/setting')">
                    Privacy and Policy
                  </li>
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600" @click="navigateTo('/setting')">
                    System User Manual
                  </li>
                  <div class="mt-2">
                    <hr class="border-0 border-t border-gray-500"/>
                  </div>
                  <li class="profile-list hover:bg-gray-100 dark:hover:bg-gray-600" @click="handleLogout">
                    LogOut
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <div
            class="main-content bg-gray-100 dark:bg-gray-900"
            :class="{
            'md:left-16 md:w-[calc(100%-4rem)]': isSidebarCollapsed,
            'md:left-60 md:w-[calc(100%-15rem)]': !isSidebarCollapsed
          }"
        >
          <div class="container px-4 py-4">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component"/>
              </transition>
            </router-view>
          </div>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 right-0 bg-white text-white dark:bg-gray-800
      dark:text-black md:hidden z-10 cursor-pointer border-2 border-red-2">
        <div class="flex flex-col">
          <div class="flex justify-around py-2">
            <div
                v-for="(link, index) in visibleMobileLinks"
                :key="index"
                class="flex flex-col items-center p-2"
                @click="navigateTo(link.route)"
            >
              <component
                  :is="iconComponents[link.icon]"
                  class="h-6 w-6"
                  v-if="iconComponents[link.icon]"
              />
              <span class="text-xs mt-1">{{ link.label }}</span>
            </div>
            <div
                class="flex flex-col items-center p-2"
                @click="toggleMobileMenu"
            >
              <ChevronDownIcon
                  class="h-6 w-6"
                  :class="{ 'rotate-180': isMobileMenuOpen }"
              />
              <span class="text-xs mt-1">{{ isMobileMenuOpen ? 'Less' : 'More' }}</span>
            </div>
          </div>
          <div
              class="bg-white dark:bg-gray-700 transition-all duration-300 overflow-hidden"
              :class="isMobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0'"
          >
            <ul class="px-2">
              <li
                  v-for="(link, index) in hiddenMobileLinks"
                  :key="'hidden-'+index"
                  class="py-2 border-b border-white dark:border-gray-600"
                  @click="navigateTo(link.route)"
              >
                <div class="flex items-center">
                  <component
                      :is="iconComponents[link.icon]"
                      class="h-5 w-5 mr-3"
                      v-if="iconComponents[link.icon]"
                  />
                  <span>{{ link.label }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onBeforeUnmount, type Component} from 'vue';
import {useRouter, useRoute, type RouteLocationRaw} from 'vue-router';
import {
  Bars3Icon,
  HomeIcon,
  AcademicCapIcon,
  CogIcon,
  ChevronDownIcon,
  UserCircleIcon,
  NewspaperIcon,
  BookOpenIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  CurrencyBangladeshiIcon,
  MapIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  FolderMinusIcon,
  SignalIcon
} from '@heroicons/vue/24/outline';
import ThemeToggle from '@/views/ThemeToggle.vue';

interface NavLink {
  label: string;
  icon: keyof typeof iconComponents;
  route: string;
}

const isSidebarCollapsed = ref<boolean>(false);
const isUserDropdownOpen = ref<boolean>(false);
const isNewDropdownOpen = ref<boolean>(false);
const isMobileMenuOpen = ref<boolean>(false);
const isDesktop = ref<boolean>(window.innerWidth >= 768);

const iconComponents: Record<string, Component> = {
  HomeIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  MapIcon,
  ChartPieIcon,
  UserCircleIcon,
  NewspaperIcon,
  CogIcon,
  SignalIcon,
  CreditCardIcon,
  CurrencyBangladeshiIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  FolderMinusIcon
};

const handleLogout = (): void => {
};

const router = useRouter();
const route = useRoute();

const links = ref<NavLink[]>([
  {
    label: 'Dashboard',
    icon: 'HomeIcon',
    route: '/admin',
  },
  {
    label: 'My-Lessons',
    icon: 'AcademicCapIcon',
    route: '/admin/lessons',
  },


  {
    label: 'Students',
    icon: 'UserCircleIcon',
    route: '/admin/users-lists',
  },
]);

const visibleMobileLinks = computed<NavLink[]>(() => links.value.slice(0, 4));
const hiddenMobileLinks = computed<NavLink[]>(() => links.value.slice(4));

const toggleSidebar = (): void => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleUserDropdown = (): void => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navigateTo = (routePath: RouteLocationRaw): void => {
  router.push(routePath);
};

const isLinkActive = (link: NavLink): boolean => {
  if (link.route === '/') {
    return route.path === '/';
  }
  return route.path === link.route || route.path.startsWith(`${link.route}/`);
};

const handleResize = (): void => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #bfdbfe;
}

::-webkit-scrollbar-thumb {
  background: #93c5fd;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #93c5fd;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #93c5fd #bfdbfe;
}

.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: #93c5fd;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #93c5fd;
  border-radius: 3px;
}

.sidebar-content {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 #93c5fd;
}

.user-profile-dropdown::-webkit-scrollbar {
  width: 4px;
}

.user-profile-dropdown::-webkit-scrollbar-track {
  background: #bfdbfe;
}

.user-profile-dropdown::-webkit-scrollbar-thumb {
  background: #93c5fd;
  border-radius: 2px;
}

.user-profile-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #93c5fd #bfdbfe;
}
</style>