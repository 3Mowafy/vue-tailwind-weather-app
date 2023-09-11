<template>
  <Transition name="parent">
    <div
      v-show="modalView"
      class="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 px-8"
    >
      <Transition name="child">
        <div
          v-if="modalView"
          class="bg-white mt-24 max-w-screen-md mx-auto p-4 rounded-lg"
        >
          <slot />
          <button
            @click="$emit('close-modal')"
            class="bg-we-primary text-white px-6 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalView: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.parent-enter-active,
.parent-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.parent-enter-from,
.parent-leave-to {
  opacity: 0;
}

.child-enter-active,
.child-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.3s;
}

.child-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
</style>
