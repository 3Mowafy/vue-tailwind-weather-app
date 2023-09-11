<template>
  <div class="flex flex-col items-center py-6">
    <div class="flex flex-col mb-12">
      <AnimatedSkeleton class="w-[200px] h-[60px] mb-4" />
      <AnimatedSkeleton class="w-[100px] self-center" />
    </div>

    <div class="flex flex-col mb-12">
      <AnimatedSkeleton class="w-[120px] h-[120px] mb-4 self-center" />
      <AnimatedSkeleton class="w-[80px] self-center" />
    </div>

    <AnimatedSkeleton class="w-[100%] h-[2px] mb-4 self-center" />

    <AnimatedSkeleton class="w-[300px] h-[100px] mb-16 self-center" />

    <AnimatedSkeleton class="w-[100%] h-[2px] mb-4 self-center" />

    <AnimatedSkeleton class="w-[300px] h-[100px] mb-4 self-center" />
  </div>
</template>

<script setup>
import AnimatedSkeleton from "./AnimatedSkeleton.vue";
</script>
