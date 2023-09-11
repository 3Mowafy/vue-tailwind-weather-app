<template>
  <main class="container text-white">
    <div class="pt-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for a city"
        class="w-full bg-transparent shadow-sm p-1 border-b focus:outline-none focus:border-we-secondary"
      />

      <div
        v-if="searchResults"
        class="absolute bg-we-secondary w-full shadow-md top-[70px] px-1 py-2 z-10"
      >
        <p v-if="searchError" class="text-center">
          Sorry, something went wrong, please try again.
        </p>
        <p
          v-if="!searchError && searchResults.length === 0"
          class="text-center"
        >
          No results match your query, try a different term.
        </p>
        <p
          v-else
          class="py-2 cursor-pointer bg-we-secondary"
          v-for="searchResult of searchResults"
          :key="searchResult.id"
          @click="cityView(searchResult)"
        >
          {{ searchResult.place_name }}
        </p>
      </div>
    </div>

    <div class="mt-3">
      <Suspense>
        <template #fallback><CardSkeleton /></template>
        <CityList />
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CardSkeleton from "../components/CardSkeleton.vue";

const router = useRouter();
const cityView = (cityInfo) => {
  const [city, state] = cityInfo.place_name.split(",");

  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city },
    query: {
      lat: cityInfo.geometry.coordinates[1],
      lon: cityInfo.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapBoxApiKey =
  "pk.eyJ1IjoibW9oYW1lZG1vd2FmeSIsImEiOiJjbG00a3dtdjEyOXo2M2ZwM25rcm1idTZtIn0.yxCx1ULcyB2CuPabXwrwXg";

const searchQuery = ref("");
const queryTimeOut = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value);
  queryTimeOut.value = setTimeout(async () => {
    if (searchQuery !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxApiKey}&types=place`
        );
        searchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
    }
  }, 350);
};
</script>
