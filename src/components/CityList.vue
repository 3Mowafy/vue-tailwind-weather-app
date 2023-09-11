<template>
  <div v-for="city of savedCities" :key="city.id">
    <CityCard :city="city" @click="displayCity(city)" />
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const req = [];
  savedCities.value.forEach((city) => {
    req.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      )
    );
  });

  const weatherData = await Promise.all(req);

  weatherData.forEach((val, index) => {
    savedCities.value[index].weather = val.data;
  });
};

await getCities();

const router = useRouter();
const displayCity = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
  });
};
</script>
