<script setup>
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
// import { ref, watch } from 'vue';
import LogoutButton from './components/LogoutButton.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const currentRoute = useRoute();
const logoutButtonVisible = computed(() => {
  return currentRoute.path !== "/auth/login"

})


</script>

<template>
  <nav class="p-4 flex gap-3 justify-between items-center">
    <RouterLink to="/">
      <h1 class="text-amber-500">
        Administration Panel
      </h1>
    </RouterLink>
    <!-- <LogoutButton v-if="router.currentRoute !== '/auth/login' ? true : false" /> -->
    <LogoutButton v-if="logoutButtonVisible" />
    <!-- <p class="text-amber-500">only authorized admins are allowed to proceed</p> -->
  </nav>
  <main class="flex justify-center min-h-screen bg-gray-100 w-full h-full">
    <main class="min-h-screen bg-gray-100 px-2 sm:px-6 w-full md:max-w-[768px] mx-auto ">
      <RouterView />
    </main>
  </main>
  <Toast />
</template>
