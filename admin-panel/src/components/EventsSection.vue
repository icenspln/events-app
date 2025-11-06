<script setup>


import Button from "primevue/button"
import { onMounted, ref } from 'vue';
import Axios from '@/api/Axios';
import { useToast } from 'primevue';

const loading = ref(true);
const events = ref([]);
const fetchError = ref(false);

const toast = useToast()

onMounted(async () => {
  try {
    const res = await Axios.get("/event")
    loading.value = false;
    events.value = res.data.events
  } catch (err) {
    console.log(err)
    loading.value = false;
    fetchError.value = true;
    toast.add({ severity: "error", life: 3000, summary: "Error loading events!" })
  }
})

</script>
<template>
  <section class="my-5">
    <div class="flex gap-3 mb-3 justify-between items-center">
      <div>
        <h2 class="text-xl">
          Events
        </h2>
        <p class="text-amber-500">Events currently being displayed in the main site</p>
      </div>
      <RouterLink to="/event/new">
        <Button>Create new event</Button>
      </RouterLink>
    </div>
    <!--  table  -->
    <!-- <p class="text-amber-500" v-if="loading">loading..</p> -->
    <p class="flex justify-center" v-if="loading">
      <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
    </p>
    <div v-else-if="events.length == 0" class="text-amber-500">There are not events to display!</div>
    <div v-else-if="events">
      <article v-for="(e) in events" :key="e._id" class="flex justify-start gap-3 items-center">
        <span>
          {{ e._id }}
        </span>
        <span class="font-bold">
          {{ e.title }}
        </span>
        <!-- <span class="font-bolder mb-1">
          <span class="text-gray-950">
            {{ e.startDate }}
          </span>
        </span> -->
        <span class="font-bolder text-blue-500">
          <RouterLink :to="`/event/${e._id}`">
            view
          </RouterLink>
        </span>
        <!-- <span class="font-bolder text-amber-500">
          <RouterLink :to="`/event/update/${e._id}`">
            Edit
          </RouterLink>
        </span> -->
        <span class="font-bolder text-rose-400">
          Delete
        </span>
        <hr>
      </article>
    </div>
    <p class="text-rose-400" v-else>Error fetching events</p>



  </section>
</template>

<!--
<template>
  <section class="my-5">
    <div class="flex gap-3 mb-3 justify-between items-center">
      <div>
        <h2 class="text-xl">
          Events
        </h2>
        <p class="text-amber-500">Events currently being displayed in the main site</p>
      </div>
      <RouterLink to="">
        <Button>Create new event</Button>
      </RouterLink>
    </div>
    <p class="text-rose-400" v-if="fetchError">Error fetching events</p>
    <div v-else>
      <article v-for="(e) in events" :key="e._id" class="my-4">

        <h4>
          _id: {{ e._id }}
        </h4>
        <div class="font-bolder mb-1">
          <span>name: </span>
          <span class="text-gray-950">
            {{ e.title }}
          </span>
        </div>
        <div class="font-bolder mb-1">
          <span>organizer: </span>
          <span class="text-gray-950">
            {{ e.organizer }}
          </span>
        </div>
        <div class="font-bolder mb-1">
          <span>description: </span>
          <span class="text-gray-950">
            {{ e.description }}
          </span>
        </div>
        <div class="font-bolder mb-1">
          <span>start date: </span>
          <span class="text-gray-950">
            {{ e.startDate }}
          </span>
        </div>
        <div class="font-bolder mb-1">
          <span>duration: </span>
          <span class="text-gray-950">
            {{ e.duration }}
          </span>
        </div>
        <div class="font-bolder mb-1">
          <span>photos: </span>
          <span class="text-gray-950">

            <a class="block" v-for="(p, i) in e.photos" :href="p" :key="i">{{ p }}</a>
          </span>
        </div>
        <span class="font-bolder text-amber-500">
          Edit
        </span>
        <span class="font-bolder text-rose-400">
          Delete
        </span>
        <hr>
      </article>
    </div>



  </section>
</template> -->
