import { createRouter, createWebHistory } from "vue-router";
import ScreenView from "@/pages/screenView";

const routes = [
  {
    path: "/",
    name: "ScreenView",
    component: ScreenView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
