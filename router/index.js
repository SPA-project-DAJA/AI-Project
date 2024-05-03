import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/home/Home.vue";
import SearchPage from "@pages/Search.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
