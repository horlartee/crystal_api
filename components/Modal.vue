<template>
  <div
    v-if="showModal"
    @click.self="close"
    ref="target"
    class="modal flex fixed inset-0 bg-black/20 items-center justify-center cursor-pointer
    after:fixed after:inset-0 after:bg-black/20 after:-z-[1] z-[999]">
    <div class="main min-w-[80%] max-w-[90%] sm:min-w-[500px] min-h-[300px] flex bg-white shadow-lg rounded-2xl relative">
      <svg
        @click="close"
        class="absolute w-6 text-primary hover:text-red-500 top-4 right-4 cursor-pointer"
        fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
      <div v-bind="$attrs" class="w-full flex cursor-default transition-all duration-300">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})
const emits = defineEmits(["update:modelValue"])
const showModal = ref(false)
onMounted(() => {
  showModal.value = props.modelValue
})
watch(() => props.modelValue, (val) => {
  showModal.value = val
})
const close = () => {
  showModal.value = false
  emits("update:modelValue", false)
}
</script>

<style scoped>
.modal {
  display: flex;
}
.modal .main {
  animation: in 0.3s;
  transition: all 0.3s ease-in-out;
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>