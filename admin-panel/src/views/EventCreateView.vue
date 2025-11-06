<script setup>
import Button from "primevue/button"
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Message from "primevue/message"
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { iso, z } from 'zod';
import { Textarea, useToast } from 'primevue';
import Axios from '@/api/Axios';
import { useRouter } from 'vue-router';


const router = useRouter()
const toast = useToast()

const loading = ref(false)
const error = ref(false)


const initialValues = ref({
  title: "",
  organizer: "",
  description: "",
  startDate: "",
  duration: "",
  // photos: ["/"],
})
const resolver = ref(zodResolver(
  z.object({
    title: z.string().min(3, { message: 'title is required.' }),
    organizer: z.string().min(2, { message: 'oganizer is required.' }),
    description: z.string().min(3, { message: 'description is required.' }),
    startDate: iso.date({ error: "start date is required!" }),
    duration: iso.date({ error: "duration is required!" }),
    photos: z.array().default(["///"])
  })
));

const onFormSubmit = async (e) => {
  console.log("[DEBUG]", e)
  if (e.valid) {
    console.log("[DEBUG]", e.values)
    loading.value = true
    try {
      const res = await Axios.post(`/event`, e.values)
      loading.value = false
      toast.add({ severity: 'success', summary: res.data.message, life: 3000 })
      router.push("/")
    }
    catch (err) {
      loading.value = false
      error.value = true
      console.log(err)
      toast.add({ severity: 'error', summary: "Failed!", life: 3000 })
    }
  }
};

const onCancel = () => {
  router.push("/")
  return;
}

</script>

<template>
  <section class="my-5">
    <h1 class="text-lg mb-3">Create New Event</h1>
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
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="onCancel"></Button>
        <Button :disabled="!$form.valid" type="submit" label="Save"></Button>
      </div>
    </Form>
  </section>
</template>
