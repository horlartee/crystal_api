<template>
  <span
    v-share:clipboard="{ url: copyText }"
    @copied="emits('copied')"
    @click="emits('doNotRedirect')"
    class="flex gap-1 relative z-10"
  >
    {{ displayText }}
    <svg
      v-if="!hideIcon"
      class="cursor-pointer w-6 h-6 opacity-50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      ></path>
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  toDisplay?: string;
  toCopy: string;
  hideIcon?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["copied", "doNotRedirect"]);
const displayText = computed(() => props.toDisplay || props.toCopy);
const copyText = computed(() => props.toCopy || "***");
</script>