<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-we-primary">
    <AppNav />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import AppNav from "@/components/AppNav.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.page-enter-active {
  transition: 3s ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
