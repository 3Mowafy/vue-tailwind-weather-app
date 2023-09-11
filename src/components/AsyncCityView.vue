<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-we-secondary py-3 text-white w-full text-center"
      v-if="route.query.preview"
    >
      You are currently previewing this city, click the "+" icon to start
      tracking this city.
    </div>

    <!-- Weather Info -->
    <div class="flex flex-col items-center text-white py-6">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        -
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("EN-US", {
            timeStyle: "short",
          })
        }}
      </p>

      <p class="text-7xl mb-6">
        {{ Math.round(((weatherData.current.temp - 32) * 5) / 9) }}&deg;<sup
          >C</sup
        >
      </p>

      <div class="text-center text-sm">
        <p>
          Feels Like
          {{
            Math.round(((weatherData.current.feels_like - 32) * 5) / 9)
          }}&deg;<sup>C</sup>
        </p>

        <p class="capitalize text-orange-400">
          {{ weatherData.current.weather[0].description }}
        </p>

        <img
          class="w-[100px] h-auto"
          :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          :alt="weatherData.current.weather[0].description"
        />
      </div>
    </div>

    <hr class="border-white border-opacity-10 w-full border" />

    <!-- Hourly Weather -->
    <div class="md:max-w-screen-md w-full py-6">
      <div class="mx-8 text-white">
        <h2 class="mb-8 text-xl">Hourly Weather</h2>
        <div class="flex gap-8 px-3 overflow-x-scroll">
          <div
            v-for="hour in weatherData.hourly"
            :key="hour.dt"
            class="flex flex-col items-center"
          >
            <p class="whitespace-nowrap">
              {{
                new Date(hour.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
              :alt="hour.weather[0].description"
              :title="hour.weather[0].description"
            />
            <p>{{ Math.round(((hour.temp - 32) * 5) / 9) }}&deg;<sup>C</sup></p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 w-full border" />

    <!-- Weekly Weather -->
    <div class="md:max-w-screen-md w-full py-6">
      <div class="mx-8 text-white">
        <h2 class="mb-8 text-xl">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[w-50px] h-[50px] object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            :alt="day.weather[0].description"
            :title="day.weather[0].description"
          />
          <div class="flex gap-x-5 flex-1 justify-end">
            <p>
              H: {{ Math.round(((day.temp.max - 32) * 5) / 9) }}&deg;<sup
                >C</sup
              >
            </p>
            <p>
              L: {{ Math.round(((day.temp.min - 32) * 5) / 9) }}&deg;<sup
                >C</sup
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();
</script>
