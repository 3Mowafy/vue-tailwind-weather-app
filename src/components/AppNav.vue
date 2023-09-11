<template>
  <header class="sticky top-0 bg-we-primary shadow-lg z-50">
    <nav
      class="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <RouterLink :to="{ path: '/' }">
        <div class="flex gap-3 text-white">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">APP HOME</p>
        </div>
      </RouterLink>

      <div class="flex gap-3">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-white text-xl hover:text-we-secondary duration-200 cursor-pointer"
        ></i>
        <i
          @click="addCity"
          v-if="route.query.preview"
          class="fa-solid fa-plus text-white text-xl hover:text-we-secondary duration-200 cursor-pointer"
        ></i>
        <i
          @click="removeCity"
          v-if="!route.query.preview && route.params.city"
          class="fa-solid fa-trash text-white text-xl hover:text-we-secondary duration-200 cursor-pointer"
        ></i>
      </div>
    </nav>
    <base-modal :modalView="modalView" @close-modal="toggleModal">
      <h2 class="text-2xl mb-1">About:</h2>
      <p>
        The Local Weather allows you to track the current and future weather of
        cities of your choosing.
      </p>
      <hr class="mb-4 border-t-slate-300" />
      <h2 class="text-2xl">How it works:</h2>
      <ol class="list-decimal list-inside">
        <li>Search for your city by entering the name into the search bar.</li>
        <li>
          Select a city within the results, this will take you to the current
          weather for your selection.
        </li>
        <li>
          Track the city by clicking on the "+" icon in the top right. This will
          save the city to view at a later time on the home page.
        </li>
      </ol>
      <hr class="mb-4 border-t-slate-300" />
      <h2 class="text-2xl">Removing a city</h2>
      <p>
        If you no longer wish to track a city, simply select the city within the
        home page. At the bottom of the page, there will be an option to delete
        the city.
      </p>
      <hr class="mb-4 border-t-slate-300" />
    </base-modal>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { uid } from "uid";
import BaseModal from "./BaseModal.vue";

const router = useRouter();
const route = useRoute();
const savedCities = ref([]);
const addCity = () => {
  let query = Object.assign({}, route.query);
  delete query.preview;

  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  for (let city of savedCities.value) {
    if (city.city === route.params.city) {
      router.replace({ query });
      return alert("you are already saved this city");
    }
  }

  const location = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(location);

  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
  router.replace({ query });
};

const modalView = ref(false);
function toggleModal() {
  modalView.value = !modalView.value;
}

const removeCity = () => {
  let cities = JSON.parse(localStorage.getItem("savedCities"));
  cities = cities.filter((city) => city.id !== route.query.id);

  localStorage.setItem("savedCities", JSON.stringify(cities));

  router.push({ name: "home" });
};
</script>

<style scoped></style>
