import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const leng = JSON.parse(localStorage.getItem("savedCities")).length;
  to.name === "home" && leng > 0
    ? (document.title = `${to.meta.title} || (${leng}) Cities Saved`)
    : (document.title = to.meta.title);

  to.name === "cityView"
    ? (document.title = `Weather || ${to.params.city} `)
    : (document.title = to.meta.title);
  next();
});

export default router;
