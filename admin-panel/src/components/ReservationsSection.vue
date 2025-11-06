<script setup>


import Button from "primevue/button"

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional

import { onMounted, ref } from 'vue';
import Axios from '@/api/Axios';
import { useToast } from 'primevue';

const loading = ref(true);
const reservations = ref([]);
const fetchError = ref(false);

const toast = useToast()

onMounted(async () => {
  try {
    const res = await Axios.get("/reservation")
    loading.value = false;
    reservations.value = res.data.reservations
  } catch (err) {
    console.log(err)
    loading.value = false;
    fetchError.value = true;
    toast.add({ severity: "error", life: 3000, summary: "Error loading reservations!" })
  }
})

</script>
<template>
  <section class="my-5">
    <div class="flex gap-3 mb-3 justify-between items-center">
      <div>
        <h2 class="text-xl">
          Reservations
        </h2>
        <!-- <p class="text-amber-500">Events currently being displayed in the main site</p> -->
      </div>
      <Button severity="contrast">Export To CSV</Button>
    </div>
    <!--  table  -->
    <!-- <p class="text-amber-500" v-if="loading">loading..</p> -->
    <p class="flex justify-center" v-if="loading">
      <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
    </p>
    <div v-else-if="reservations.length == 0" class="text-blue-500">There are not reservations to display!</div>
    <div v-else-if="reservations">
      <DataTable :sort-field="firstName" striped-rows class="w-full" :value="reservations" paginator :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column sortable field="firstName" header="first name"></Column>
        <Column sortable field="lastName" header="last name"></Column>
        <Column field="phone" header="phone number"></Column>
        <Column field="eventId" header="event id"></Column>
      </DataTable>
    </div>
    <p class="text-rose-400" v-else>Error fetching reservations</p>

  </section>
</template>
