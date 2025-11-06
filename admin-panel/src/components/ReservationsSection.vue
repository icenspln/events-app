<script setup>


import Button from "primevue/button"
import exportFromJSON from "export-from-json";

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
function exportDataFromJSON(data) {
  if (!data) return;
  try {
    console.log("[DEBUG]", reservations.value)
    const fileName = "reservations-list";
    const exportType = exportFromJSON.types["xls"];
    exportFromJSON({ data, fileName, exportType });
  } catch (e) {
    console.log(e.message)
    // throw new Error("Parsing failed!");
  }
}



</script>
<template>
  <section class="my-5">
    <div class="flex gap-3 mb-3 justify-between items-center">
      <div>
        <h2 class="text-xl font-bold">
          Reservations
        </h2>
        <!-- <p class="text-amber-500">Events currently being displayed in the main site</p> -->
      </div>
      <!-- <Button severity="contrast">Export To CSV</Button> -->
    </div>
    <!--  table  -->
    <!-- <p class="text-amber-500" v-if="loading">loading..</p> -->
    <p class="flex justify-center" v-if="loading">
      <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
    </p>
    <p class="text-rose-400" v-if="fetchError">Error fetching reservations</p>
    <div v-else-if="reservations.length == 0" class="text-blue-500">There are not reservations to display!</div>
    <div v-else>
      <DataTable striped-rows class="w-full" :value="reservations" paginator :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]">
        <template #header>
          <div class="text-end pb-4">
            <Button severity="contrast" icon="pi pi-external-link" label="Export"
              @click="exportDataFromJSON(reservations)" />
          </div>
        </template>
        <Column sortable field="firstName" header="first name"></Column>
        <Column sortable field="lastName" header="last name"></Column>
        <Column field="phone" header="phone number"></Column>
        <Column field="eventId" header="event id"></Column>
      </DataTable>
    </div>

  </section>
</template>
