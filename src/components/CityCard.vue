<template>
  <div
    class="flex mb-3 p-5 bg-we-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-xl">{{ city.city }}</h2>
      <p class="text-sm">{{ city.state }}</p>
    </div>
    <div class="flex flex-1">
      <img
        class="w-[w-50px] h-[50px] object-cover"
        :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
        :alt="city.weather.weather[0].description"
        :title="city.weather.weather[0].description"
      />
    </div>
    <div class="flex flex-col">
      <div class="flex self-end mb-1">
        <p class="text-2xl">
          {{ Math.round(((city.weather.main.temp - 32) * 5) / 9) }}&deg;<sup
            >C</sup
          >
        </p>
      </div>

      <div class="flex gap-x-2">
        <p class="text-sm">
          H:
          {{ Math.round(((city.weather.main.temp_max - 32) * 5) / 9) }}&deg;<sup
            >C</sup
          >
        </p>
        <p class="text-sm">
          L:
          {{ Math.round(((city.weather.main.temp_min - 32) * 5) / 9) }}&deg;<sup
            >C</sup
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
  },
});
</script>
