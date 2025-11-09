<template>
  <div class="">
    <CustomSelect
      :options="assigneeList"
      :default="'go'"
      class="select min-w-[160px]"
      v-model="assignee"
      @doNotRedirect="$emit('doNotRedirect', true)"
      @update:modelValue="updateAssignee"
      :disabled="requesting"
    />
    <div
      v-show="requesting"
      class="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center rounded-lg"
    >
      <Loader class="mx-auto [&>*]:bg-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useBookingStore } from "@/stores/booking";
import { Caller } from "@/types/booking";
const bookingStore = useBookingStore();
const props = defineProps<{
  bookingAssignee: { _id: string; name: string };
  bookingId: string;
  assigneeList: { _id: string; name: string }[];
}>();

const assignee = ref(null);
const assignCaller = () => {
  if (props.bookingAssignee !== null) {
    assignee.value = props.bookingAssignee;
  } else {
    assignee.value = "";
  }
};
assignCaller();
const requesting = ref(false);

const updateAssignee = async (val: Caller) => {
  // console.log(assignee.value);
  requesting.value = true;
  await bookingStore.updateCaller({
    bookingId: props.bookingId,
    assigneeId: val._id,
  });
  assignee.value = val;

  setTimeout(() => {
    requesting.value = false;
  }, 3000);
  console.log(val);
};
</script>