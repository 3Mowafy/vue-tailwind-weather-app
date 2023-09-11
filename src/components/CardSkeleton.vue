<template>
  <div class="flex my-3 p-5 bg-we-secondary rounded-md shadow-md">
    <div class="flex flex-col flex-1">
      <AnimatedSkeleton class="w-[50%] mb-2" />
      <AnimatedSkeleton class="w-[30%]" />
    </div>

    <div class="flex flex-col flex-1 items-end">
      <AnimatedSkeleton class="w-[20%] mb-2" />
      <AnimatedSkeleton class="w-[50%]" />
    </div>
  </div>
</template>

<script setup>
import AnimatedSkeleton from "./AnimatedSkeleton.vue";
</script>
