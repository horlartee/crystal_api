<template>
  <div class="w-full text-black py-10 flex flex-col">
    <div class="flex-grow">
      <Self v-if="bookingType === BookingType.SELF" />
      <Someone v-else />
    </div>

    <div class="h-2 w-full bg-gray-300 mt-3 rounded-full">
      <div
        class="h-full bg-primary rounded-full transition-all duration-500"
        :style="`width:${bookingCompletionPercentage}%`"
      ></div>
    </div>
    <Modal v-model="showRouteLeaveModal">
      <div
        class="flex flex-col items-center justify-center w-full gap-2 py-10 px-10"
      >
        <h3 class="text-xl font-bold">Stop Call Booking?</h3>
        <p class="text-slate-500 text-center sm:text-start">
          Are you sure you want to stop booking this call?
        </p>
        <div class="flex gap-3 mt-4 w-full sm:w-auto">
          <button
            @click="bookingStore.updateBookingAbortStatus(true)"
            class="p-2 sm:px-16 border border-primary hover:border-orange-500 text-primary hover:text-orange-500 rounded-lg transition-colors duration-300 flex-grow sm:flex-grow-0 text-center"
          >
            leave
          </button>
          <button
            @click="showRouteLeaveModal = false"
            class="p-2 sm:px-4 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300 flex-grow sm:flex-grow-0 text-center"
          >
            Back to booking
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Self from "@/components/booking/Self.vue";
import Someone from "@/components/booking/Someone.vue";
import { useBookingStore } from "@/stores/booking";
import { BookingType } from "@/types/booking";

definePageMeta({
  name: "booking",
  layout: "booking",
  middleware: ["auth"],
});

const bookingStore = useBookingStore();
const bookingType = computed(() => bookingStore.bookingFor);
onMounted(function () {
  const bookingType_ = useCookie("bookingType");
  if (bookingType_.value) {
    bookingStore.setBookingType(bookingType_.value as BookingType);
  }
});

const maxProgress = computed(() =>
  bookingType.value === BookingType.SELF
    ? bookingStore.maxProgress
    : bookingStore.maxProgress2
);
const bookingCompletionPercentage = computed(
  () => (maxProgress.value / 4) * 100
);

const showRouteLeaveModal = ref(false);
const confirmLeave = computed(() => bookingStore.confirmBookingAbort);
onMounted(() => bookingStore.updateBookingAbortStatus(false));
onBeforeRouteLeave((to, from, next) => {
  if (to.path == "/login") return next();
  if (confirmLeave.value) return next();
  showRouteLeaveModal.value = true;
});
const router = useRouter();
watch(confirmLeave, (val) => {
  if (!val) return;
  showRouteLeaveModal.value = false;
  setTimeout(() => router.push("/"), 500);
});
</script>