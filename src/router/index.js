import { createRouter, createWebHistory } from "vue-router";
import ScreenView from "@/pages/screenView";
import HomeView from "@/pages/homeView";

const routes = [
  {
    path: "/screenview",
    name: "ScreenView",
    component: ScreenView,
  },
  {
    path: "/",
    name: "homeView",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
