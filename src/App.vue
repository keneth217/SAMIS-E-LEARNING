<!-- App.vue -->
<template>
  <div>
    <LoadingBar ref="loadingBar"/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {useRouter} from 'vue-router'
import LoadingBar from '@/views/LoadingBar.vue'

const loadingBar = ref<InstanceType<typeof LoadingBar> | null>(null)
const router = useRouter()

console.log('Router initialized:', router)

router.beforeEach((to, from) => {
  console.log(`Navigating from ${from.path} to ${to.path}`)
  loadingBar.value?.start()
})

router.afterEach((to, from) => {
  console.log(`Navigation complete to ${to.path}`)
  loadingBar.value?.finish()
})

const handleConnectionChange = () => {
  console.group('Connection state changed')
  console.log('Current route:', router.currentRoute.value)
  console.log('navigator.onLine:', navigator.onLine)

  if (!navigator.onLine) {
    console.log('Offline detected - redirecting to /no-internet')
    if (router.currentRoute.value.path !== '/no-internet') {
      router.push('/no-internet')
    } else {
      console.log('Already on /no-internet - no redirect needed')
    }
  } else if (router.currentRoute.value.name === 'NoInternet') {
    console.log('Online restored - redirecting to home')
    router.push('/')
  }

  console.groupEnd()
}

onMounted(() => {
  console.log('App mounted - checking initial connection state')
  loadingBar.value?.start()

  setTimeout(() => {
    loadingBar.value?.finish()
    console.log('Initial loading simulation complete')
  }, 1000)

  console.log('Initial navigator.onLine:', navigator.onLine)
  if (!navigator.onLine) {
    console.log('Initial offline state detected')
    if (router.currentRoute.value.path !== '/no-internet') {
      router.push('/no-internet')
    }
  }

  window.addEventListener('online', handleConnectionChange)
  window.addEventListener('offline', handleConnectionChange)
  console.log('Event listeners added')
})

onBeforeUnmount(() => {
  window.removeEventListener('online', handleConnectionChange)
  window.removeEventListener('offline', handleConnectionChange)
  console.log('Event listeners removed')
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>