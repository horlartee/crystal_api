<template>
  <label class="switch">
    <input @change="onChange" type="checkbox" :checked="modelValue" :disabled="disabled">
    <span class="slider round"></span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
})
const emits = defineEmits(["update:modelValue"])
const onChange = (e: any) => !props?.disabled ? emits("update:modelValue", e.target.checked) : null
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  @apply inset-0;
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  @apply bg-primary;
}

input:focus + .slider {
  @apply shadow-primary;
  box-shadow: 0 0 1px;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>