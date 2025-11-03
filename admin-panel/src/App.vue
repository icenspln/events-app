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
  <nav class="p-4">
    <h1 class="text-amber-500">Administration Panel</h1>
    <!-- <LogoutButton v-if="router.currentRoute !== '/auth/login' ? true : false" /> -->
    <LogoutButton v-if="logoutButtonVisible" />
    <!-- <p class="text-amber-500">only authorized admins are allowed to proceed</p> -->
  </nav>
  <RouterView />
  <Toast />
</template>

<style scoped></style>
