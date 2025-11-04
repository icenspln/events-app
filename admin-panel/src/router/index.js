import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import EventView from "@/views/EventDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth/login", component: LoginView },
    {
      path: "/",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/event/:id",
      component: EventView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (!token) {
      return { path: "/auth/login" };
    }
  }
});

export default router;
