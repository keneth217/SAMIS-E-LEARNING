<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <div :class="isSidebarCollapsed ? 'w-16' : 'w-60'" class="sidebar-content  text-white hidden md:block">
      <div class="mt-20">
        <hr class="border-0 border-t border-white"/>
      </div>

      <ul class="sidebar-lists">
        <li
            v-for="link in links"
            :key="link.label"
            class="flex flex-col"
            @click="handleLinkClick(link)">
          <div class="sidebar-links" :class="{ active: isLinkActive(link) }">
            <component
                :is="iconComponents[link.icon]"
                class="h-6 w-6 mr-4"
                v-if="iconComponents[link.icon]"
            />
            <span v-if="!isSidebarCollapsed">{{ link.label }}</span>
            <ChevronDownIcon
                v-if="link.children"
                class="h-4 w-4 ml-20"
                :class="{ 'rotate-180': link.isOpen }"
            />
          </div>
          <ul
              v-if="link.children"
              :class="{
                'max-h-0 opacity-0': !link.isOpen,
                'max-h-40 opacity-100': link.isOpen,
              }"
              class="transition-all duration-300 ease-out overflow-auto bg-blue-100">
            <li
                v-for="child in link.children"
                :key="child.label"
                class="text-sm pl-8 py-2 hover:bg-gray-400 cursor-pointer flex items-center overflow-auto"
                @click="navigateTo(child.route)">
              <component
                  :is="iconComponents[child.icon]"
                  class="h-4 w-4 mr-2"
                  v-if="iconComponents[child.icon]"/>
              <span v-if="!isSidebarCollapsed">{{ child.label }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="flex-1 flex flex-col transition-all duration-300 w-full">
      <header
          class="header-container"
          :class="{
        'md:left-16 md:w-[calc(100%-4rem)]': isSidebarCollapsed,
        'md:left-60 md:w-[calc(100%-15rem)]': !isSidebarCollapsed
      }"
      >
        <div class="container flex items-center justify-between h-full px-4">
          <div class="flex items-center gap-4">
            <!-- Hamburger menu (hidden on mobile) -->
            <div class="text-2xl text-black cursor-pointer hidden md:block" @click="toggleSidebar">
              <Bars3Icon class="h-6 w-6 mr-8 text-black cursor-pointer"/>
            </div>
            <!-- School name - always visible -->
            <p class="text-sm md:text-xl text-black font-bold font-serif text-center capitalize">
              SAMIS
            </p>
          </div>
          <div class="flex items-center">
            <!-- User dropdown -->
            <div
                class="text-white md:text-black flex items-center cursor-pointer relative mr-4 md:mr-20"
                @click="toggleUserDropdown"
                @mouseenter="isDesktop && (isUserDropdownOpen = true)"
                @mouseleave="isDesktop && (isUserDropdownOpen = false)"
            >
              <p class="capitalize text-xl ">KENETH</p>
              <ChevronDownIcon
                  class="h-4 w-4 text-white md:text-blue-900 cursor-pointer text-bold font-bold md:ml-4"
                  :class="{ 'rotate-180': isUserDropdownOpen }"
              />

              <ul
                  :class="{
                  'max-h-0 opacity-0': !isUserDropdownOpen,
                  'max-h-80 opacity-200': isUserDropdownOpen,
                }"
                  class="user-profile-dropdown"
              >
                <li class="profile-list" @click="navigateTo('/profile')">
                  Profile
                </li>
                <li class="profile-list" @click="navigateTo('/dash/setting')">
                  Settings
                </li>

                <hr class="border-0 border-t border-gray-500"/>

                <li class="profile-list" @click="navigateTo('/setting')">
                  Terms Of Service
                </li>
                <li class="profile-list" @click="navigateTo('/setting')">
                  Privacy and Policy
                </li>
                <li class="profile-list" @click="navigateTo('/setting')">
                  System User Manual
                </li>
                <div class="mt-2">
                  <hr class="border-0 border-t border-gray-500"/>
                </div>
                <li class="profile-list" @click="handleLogout">
                  LogOut
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content - adjusted to match header behavior -->
      <div
          class="main-content "
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
    <div class="fixed bottom-0 left-0 right-0 bg-blue-500 text-white md:hidden z-10 mt-10">
      <div class="flex flex-col">
        <div class="flex justify-around py-2">
          <div
              v-for="(link, index) in visibleMobileLinks"
              :key="index"
              class="flex flex-col items-center p-2"
              @click="handleMobileLinkClick(link)"
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
            class="bg-blue-400 transition-all duration-300 overflow-hidden"
            :class="isMobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0'"
        >
          <ul class="px-4">
            <li
                v-for="(link, index) in hiddenMobileLinks"
                :key="'hidden-'+index"
                class="py-3 border-b border-white"
                @click="handleMobileLinkClick(link)"
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
</template>
<script setup lang="ts">
import {ref, computed, onMounted, onBeforeUnmount} from "vue";
import {useRouter, useRoute} from "vue-router";
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
} from "@heroicons/vue/24/outline";

import 'vue-toast-notification/dist/theme-sugar.css';
import {useToast} from "vue-toast-notification";
import LoadingBar from "@/views/LoadingBar.vue";

const isSidebarCollapsed = ref(false);
const isUserDropdownOpen = ref(false);
const isNewDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768)
const iconComponents = {
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


const $toast = useToast();
const handleLogout = () => {

};
onMounted(() => {
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 768;
  };
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

interface Link {
  label: string;
  icon: keyof typeof iconComponents;
  route: string;
  isOpen: boolean;
  children?: Link[];
}

const links = ref<Link[]>([
  {
    label: "Dashboard",
    icon: "HomeIcon",
    route: "/admin",
    isOpen: false,
  },
  {
    label: "Courses",
    icon: "AcademicCapIcon",
    route: "/admin/courses",
    isOpen: false,
  },

]);

const visibleMobileLinks = computed(() => links.value.slice(0, 4));
const hiddenMobileLinks = computed(() => links.value.slice(4));

const router = useRouter();
const route = useRoute();

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const toggleNewItemsDropdown = () => {
  isNewDropdownOpen.value = !isNewDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleLinkClick = (link: Link) => {
  if (link.children) {
    link.isOpen = !link.isOpen;
    if (!link.route || link.route === "#") {
      navigateTo(link.children[0].route);
    }
  } else {
    navigateTo(link.route);
  }
};

const handleMobileLinkClick = (link: Link) => {
  if (link.children) {
    navigateTo(link.children[0].route);
  } else {
    navigateTo(link.route);
  }
  isMobileMenuOpen.value = false;
};

const navigateTo = (routePath: string) => {
  router.push(routePath);
};

const isLinkActive = (link: Link): boolean => {
  if (link.route === "/") {
    return route.path === "/";
  }

  if (route.path === link.route) {
    return true;
  }

  if (route.path.startsWith(link.route + "/")) {
    return true;
  }

  if (link.children) {
    return link.children.some(child =>
        route.path === child.route ||
        route.path.startsWith(child.route + "/")
    );
  }

  return false;
};
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

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #93c5fd;
}

.sidebar-content {
  scrollbar-width: thin;
  scrollbar-color: #3b82f6 #93c5fd;
}

.user-profile-dropdown::-webkit-scrollbar {
  width: 4px;
}

.user-profile-dropdown::-webkit-scrollbar-track {
  background: #bfdbfe; /* bg-blue-200 */
}

.user-profile-dropdown::-webkit-scrollbar-thumb {
  background: #93c5fd; /* bg-blue-300 */
  border-radius: 2px;
}

.user-profile-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #93c5fd #bfdbfe; /* blue-300 / blue-200 */
}
</style>