<template>
  <div v-if="show" class="fixed top-0 right-0 p-4 z-[999]">
    <div
      :class="[animate ? 'translate-x-0' : 'translate-x-[110%]']"
      class="bg-white transition-all duration-300 rounded-lg">
      <div
        :class="[
          type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20',
          type === 'success' ? 'text-green-600' : 'text-red-600',
          type === 'success' ? 'border-green-500' : 'border-red-500',
        ]"
        class="p-3 min-w-[200px] rounded-lg border-2 flex items-center gap-3">
        <div>
          <svg
            v-if="type === 'success'"
            class="w-6 h-6"
            viewBox="0 0 8 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.96304 0.962891L2.88896 5.37647L1.03711 3.3703" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            viewBox="0 0 3 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.6665V4.99984" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 8.3335H1.00833" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
  
        <div class="flex-grow">
          <div class="text-sm font-medium">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToasterStore } from '@/stores/toaster'

const toastStore = useToasterStore()
const show = computed(() => toastStore.toaster.show)
const message = computed(() => toastStore.toaster.message)
const type = computed(() => toastStore.toaster.type)

const animate = ref(false)
const close = ()=> {
  setTimeout(() => {
    animate.value = false
    setTimeout(() =>toastStore.hideToaster(), 300)  
  }, 6000)
}
watch(show, (val) => {
  if (val) {
    setTimeout(() =>  animate.value = true,100)
    close()
  }
}, { deep: true})
</script>