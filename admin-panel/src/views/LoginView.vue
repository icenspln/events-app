<script setup>

import LoginForm from '@/components/LoginForm.vue';

</script>

<template>
  <div class="h-screen max-h-screen overflow-hidden flex flex-col">
    <nav class="p-4">
      <h1 class="text-amber-500">Administration Panel</h1>
      <!-- <p class="text-amber-500">only authorized admins are allowed to proceed</p> -->
    </nav>
    <LoginForm class="w-full flex flex-col gap-3 items-center justify-center" />
  </div>
</template>
