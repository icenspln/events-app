<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue';
import Button from "primevue/button"

const toast = useToast();
const logout = () => {
  const authStore = useAuthStore()
  authStore.logout()
  router.push({ path: "/auth/login" })
  toast.add({ severity: 'secondary', summary: "Logout successfull.", life: 3000 })
}
</script>

<template>


  <Button severity="contrast" @click="logout">
    <i class="pi pi-sign-out"></i>
    <span>
      Logout
    </span>
  </Button>


</template>
