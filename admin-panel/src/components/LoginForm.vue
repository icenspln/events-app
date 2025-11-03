<script setup>
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';
import { Form } from '@primevue/forms';
import Button from 'primevue/button';
import Message from 'primevue/message';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const toast = useToast();
const initialValues = ref({
  username: '',
  password: ''
});

const resolver = ref(zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
));

const onFormSubmit = async (e) => {
  if (e.valid) {
    try {
      const authStore = useAuthStore()
      const res = await authStore.login(e.values)
      toast.add({ severity: 'success', summary: res.data.message, life: 3000 })
    }
    catch (err) {
      console.log(err)
      toast.add({ severity: 'error', summary: err.response.data.message || "Failed!", life: 3000 })
    } finally {
      router.push("/")
    }
  }
};

</script>

<template>
  <div>
    <h3 class="text-2xl ">Login</h3>
    <br>

    <Form autocomplete="on" v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
      class="flex justify-center flex-col gap-4">
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error?.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="password" type="password" placeholder="Password" />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message }}</Message>
      </div>
      <Button :disabled="!$form.valid" type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
