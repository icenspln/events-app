import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(pinia);
app.use(ToastService);

app.mount("#app");
