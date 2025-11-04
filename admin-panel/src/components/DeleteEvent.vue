<script setup>
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button'


defineEmits(["confirm-delete"]);

</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Button @click="$emit('confirm-delete')" label="Delete" severity="danger" variant="outlined"></Button>

</template>
