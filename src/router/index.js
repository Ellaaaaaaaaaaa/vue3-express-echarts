import { createRouter, createWebHistory } from "vue-router";
import ScreenView1 from "@/pages/screenView1";
import ScreenView2 from "@/pages/screenView2";
import HomeView from "@/pages/homeView";
import LoginView from "@/pages/loginView";

const routes = [
  {
    path: "/",
    name: "loginView",
    component: LoginView,
  },
  {
    path: "/home",
    name: "homeView",
    component: HomeView,
  },
  {
    path: "/screenview1",
    name: "ScreenView1",
    component: ScreenView1,
  },
  {
    path: "/screenview2",
    name: "ScreenView2",
    component: ScreenView2,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  let username = localStorage.getItem("userName"); //这里根据自己项目的实际情况添加是否登录的判断条件
  if (to.name !== "loginView" && !username)
    next({ name: "loginView", query: { redirect: to.fullPath } });
  else next();
});
export default router;
