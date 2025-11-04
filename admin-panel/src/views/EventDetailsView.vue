<script setup>
import Axios from '@/api/Axios';
import { useToast } from 'primevue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Button from "primevue/button"
import EditEvent from '@/components/EditEvent.vue';


const toast = useToast()
const route = useRoute()

// fetching
const loading = ref(true);
const event = ref(null);
const fetchError = ref(false);
const outdated = ref(false);

watch(outdated, async () => {
  // reset outdated to false
  // refetch
  console.log("[DEBUG] watch callback triggered")
  outdated.value = false
  try {
    const res = await Axios.get(`/event/${route.params.id}`)
    loading.value = false;
    event.value = res.data.event
  } catch (err) {
    console.log(err)
    loading.value = false;
    fetchError.value = true;
    toast.add({ severity: "error", life: 3000, summary: "Error loading events!" })
  }
})

onMounted(async () => {
  outdated.value = true
})

// dialogs states
const editDialogVisible = ref(false);
const deleteDialogVisible = ref(false);


function refresh() {
  console.log("[DEBUG] refresh executing")
  outdated.value = true
}

</script>

<template>
  <section class="my-5">
    <p class="text-amber-500" v-if="loading">loading..</p>
    <template v-else-if="event">
      <div>
        <h2 class="text-lg">
          {{ event.title }}
        </h2>
      </div>
      <div>
        <article>
          <h2 class="text-gray-500">
            _id: <span class="text-gray-900">
              {{ event._id }}
            </span>
          </h2>
          <h2 class="font-bolder  text-gray-500">
            title: <span class="text-gray-900">
              {{ event.title }}
            </span>
          </h2>
          <h2 class="font-bolder  text-gray-500">
            organizer: <span class="text-gray-900">
              {{ event.organizer }}
            </span>
          </h2>
          <h2 class="font-bolder  text-gray-500">
            description: <span class="text-gray-900">
              {{ event.description }}
            </span>
          </h2>
          <h2 class="font-bolder mb-1 text-gray-500">
            start date:
            <span class="text-gray-900">
              {{ new Date(event.startDate).toDateString() }}
            </span>
          </h2>
          <h2 class="font-bolder mb-1 text-gray-500">
            end date:
            <span class="text-gray-900">
              {{ new Date(event.duration).toDateString() }}
            </span>
          </h2>
          <h2 class="font-bolder mb-1 text-gray-500">
            photos:
            <ul>
              <li v-for="(p, i) in event.photos" :key="i" class="text-gray-900">
                <a :href="p">{{ p }}</a>
              </li>
            </ul>
          </h2>
          <div class="flex justify-between items-center">
            <Button severity="secondary" @click="editDialogVisible = true" class="font-bolder text-amber-500 font-bold">
              Edit
            </Button>
            <Button severity="danger" @click="deleteDialogVisible = true" class="font-bolder text-rose-400 font-bold">
              Delete
            </Button>
          </div>
          <EditEvent @refetch="refresh" :event :editDialogVisible @hide-dialog="editDialogVisible = false" />
        </article>
      </div>
    </template>
    <p class="text-rose-400" v-else>Error fetching event</p>



  </section>
</template>
