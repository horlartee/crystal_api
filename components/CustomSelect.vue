<template>
  <div
    class="relative w-full text-left outline-none h-[47px] leading-[47px]"
    :tabindex="tabindex"
    @blur="openSelect = false"
  >
    <div
      class="bg-black/5 rounded-lg border-2 border-transparent pl-4 cursor-pointer select-none flex items-center transition-all duration-300 truncate"
      :class="{ 'border-gray-100 rounded-b-none !bg-white': openSelect }"
      @click="doNotRedirect"
    >
      <svg
        class="text-primary absolute right-0 pointer-events-none p-2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="30px"
        height="30px"
        viewBox="0 0 38 22"
        version="1.1"
      >
        <g
          id="ZahnhelferDE—Design"
          stroke="currentColor"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="ZahnhelferDE–Icon&amp;Asset-Download"
            transform="translate(-539.000000, -199.000000)"
            fill="currentColor"
            fill-rule="nonzero"
          >
            <g
              id="Icon-/-ArrowRight-Copy-2"
              transform="translate(538.000000, 175)"
            >
              <polygon
                id="Path-Copy"
                transform="translate(20.000000, 27) rotate(135.000000) translate(-20.000000, -18.384776) "
                points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631"
              />
            </g>
          </g>
        </g>
      </svg>
      {{
        selected.name
          ? selected.name.substring(0, 10) + "..."
          : !selected.name && !selected
          ? "Unassigned"
          : selected
      }}
    </div>
    <div
      class="absolute text-black rounded-b-lg overflow-hidden border-2 border-t-0 border-gray-100 bg-white inset-x-0 z-10 shadow-lg"
      :class="{
        hidden: !openSelect,
        'max-h-[20rem] overflow-y-auto': options[0].name,
      }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        :title="option.name ? option?.name : option"
        @click="handleSelect(option)"
        :class="[{ 'bg-stone-100': option === selected }]"
        class="pl-4 cursor-pointer select-none hover:bg-primary transition-all duration-200 truncate"
      >
        {{ option.name ? option.name : option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emit } from "process";

interface Props {
  options: string[] | { _id: string; name: string }[];
  tabindex?: number;
  modelValue: string;
  disabled?: boolean;
}
const props_ = withDefaults(defineProps<Props>(), {
  tabindex: 0,
  disabled: false,
});
console.log(props_.modelValue)
const emits_ = defineEmits(["update:modelValue", "doNotRedirect"]);
const selected = ref(
  props_.modelValue
    ? props_.modelValue
    : props_.options?.length > 0
    ? props_.options[0]
    : null
);
watchEffect(() => {
  if (props_.modelValue) {
    selected.value = props_.modelValue;
  }
});
const doNotRedirect = () => {
  openSelect.value = !openSelect.value;
  emits_("doNotRedirect", true);
};
const openSelect = ref(false);
const handleSelect = (option: string) => {
  openSelect.value = false;
  if (option === selected.value) return;
  selected.value = option;
  emits_("update:modelValue", option);
};
// implement disabled later
</script>

<style scoped>
.selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}
</style>