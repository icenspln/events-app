<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "primevue";
import Button from "primevue/button"

const toast = useToast();

const logout = () => {
  const authStore = useAuthStore()
  authStore.logout()
  router.push({ path: "/auth/login" })
  toast.add({ severity: 'success', summary: "Logout successfull.", life: 3000 })
}

</script>
<template>welcome home
  <Button @click="logout">Logout</Button>
</template>
