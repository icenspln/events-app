<script setup>
import Dialog from 'primevue/dialog';
import Button from "primevue/button"
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Message from "primevue/message"
import { computed, ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { iso, z } from 'zod';
import { Textarea, useToast } from 'primevue';
import { stringToDOM } from '@/helpers/date';
import Axios from '@/api/Axios';
import { useRoute } from 'vue-router';

const route = useRoute()
const toast = useToast()

const emit = defineEmits(["hide-dialog", "refetch"])
const { event, editDialogVisible } = defineProps(["event", "editDialogVisible"])

const initialValues = computed(() => {
  return {
    title: event.title,
    organizer: event.organizer,
    description: event.description,
    startDate: stringToDOM(event.startDate),
    duration: stringToDOM(event.duration),
    // photos: event.photos,
  }
})

const resolver = ref(zodResolver(
  z.object({
    title: z.string().min(3, { message: 'title is required.' }),
    organizer: z.string().min(2, { message: 'oganizer is required.' }),
    description: z.string().min(3, { message: 'description is required.' }),
    startDate: iso.date(),
    duration: iso.date({ error: "duration is required!" }),
    // photos: z.array(z.string()).optional()
  })
));

const onFormSubmit = async (e) => {
  if (e.valid) {
    try {
      const res = await Axios.put(`/event/${route.params.id}`, e.values)
      toast.add({ severity: 'success', summary: res.data.message, life: 3000 })
      emit("hide-dialog");
      emit("refetch");
      // reload

    }
    catch (err) {
      console.log(err)
      toast.add({ severity: 'error', summary: "Failed!", life: 3000 })
    }
  }
};

</script>

<template>
  <Dialog :visible="editDialogVisible" :closable="false" modal header="Update Event" :style="{ width: '25rem' }">
    <p class="font-bold text-amber-500 mb-3">submitted data will instantly show on the main site</p>
    <Form v-slot="$form" :resolver :initialValues @submit="onFormSubmit">
      <div class="flex flex-col items-start gap-4 mb-4">
        <div class="flex flex-col gap-1 w-full">
          <InputText name="title" type="text" placeholder="Title" fluid />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
            $form.title.error.message }}</Message>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <InputText name="organizer" type="text" placeholder="Organizer" fluid />
          <Message v-if="$form.organizer?.invalid" severity="error" size="small" variant="simple">{{
            $form.organizer?.error.message }}</Message>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <Textarea autoResize name="description" placeholder="Description" />
          <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{
            $form.description?.error.message }}</Message>
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label for="start-date">Start Date</label>
          <InputText id="start-date" name="startDate" type="date" fluid />
          <Message v-if="$form.startDate?.invalid" severity="error" size="small" variant="simple">{{
            $form.startDate?.error.message }}</Message>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="duration">Duration</label>
          <InputText id="duration" name="duration" type="date" fluid />
          <Message v-if="$form.duration?.invalid" severity="error" size="small" variant="simple">{{
            $form.duration?.error.message }}</Message>
        </div>
        <!-- <div class="flex flex-col gap-1">
          <InputText name="photos" type="file" placeholder="photos" fluid />
          <Message v-if="$form.photos?.invalid" severity="error" size="small" variant="simple">{{
            $form.photos?.error.message }}</Message>
        </div> -->
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="$emit('hide-dialog')"></Button>
        <Button :disabled="!$form.valid" type="submit" label="Save"></Button>
      </div>
    </Form>
  </Dialog>
</template>
