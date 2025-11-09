<template>
  <div class="flex items-center">
    <input
      @input="$emit('update:modelValue', value)"
      :value="value"
      :id="id_" type="radio" :name="name"
      class="hidden" />
    <label :for="id_" class="flex items-center cursor-pointer text-lg">
      <span class="w-6 h-6 inline-block mr-2 rounded-full border border-grey-600 bg-white flex-shrink-0"></span>
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  modelValue: string
  value: string
  label?: string
}
defineProps<Props>()
defineEmits(["update:modelValue"])
const id_ = String(new Date().getTime())
</script>

<style scoped>
input[type=radio] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type=radio] + label span:hover,
input[type=radio] + label:hover span {
  transform: scale(1.2);
}

input[type=radio]:checked + label span {
  @apply bg-primary;
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type=radio]:checked + label {
  @apply text-primary;
}
</style>