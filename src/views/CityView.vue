<template>
  <div>
    <Suspense>
      <template #fallback> <CitySkeleton /> </template>
      <AsyncCityView />
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CitySkeleton from "../components/CitySkeleton.vue";
</script>
