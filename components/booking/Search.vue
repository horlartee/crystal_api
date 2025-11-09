<template>
  <BookingFilter v-model="showFilter" @getNewFilter="getNewFilter" />
  <form class="mx-auto">
    <div
      class="sm:p-2 lg:px-6 md:bg-black md:bg-opacity-5 rounded-md mb-6 flex items-center justify-between space-x-1"
    >
      <div class="flex items-center space-x-0 xs:space-x-2 lg:space-x-6">
        <div
          class="flex items-center bg-white rounded-md px-1 xs:px-2 md:px-4 py-[2px] h-10 border-2 md:border-none"
        >
          <span>
            <img src="/search.svg" alt="search" class="w-4" />
          </span>
          <input
            type="text"
            v-model="searchInput"
            class="outline-none border-none p-2 xl:w-[20rem] text-xs sm:text-sm lg:text-base"
            placeholder="Search by order number, recipient, Status..."
          />
        </div>
        <button
          class="lg:flex mx-auto items-center space-x-2 lg:bg-white rounded-md lg:py-2 lg:px-4 h-10"
          type="button"
        >
          <img src="/filter.svg" alt="filter" class="mx-auto h-4" />
          <span
            class="block text-xs md:text-sm lg:text-base lg:inline font-semibold lg:font-medium text-opacity-50 lg:text-opacity-100"
            @click="makeModalShow"
            >Filter</span
          >
        </button>
        <!-- <button
          class="lg:flex items-center space-x-2 lg:bg-white rounded-md lg:py-2 lg:px-4 h-10"
        >
          <img src="/export-icon.svg" alt="export" class="mx-auto h-4" />
          <span
            class="block text-xs md:text-sm lg:text-base lg:inline font-semibold lg:font-medium text-opacity-50 lg:text-opacity-100"
            >Export</span
          >
        </button> -->
      </div>
      <!-- <button
        class="bg-primary text-xs md:text-sm lg:text-base rounded-md hover:bg-primary-faded duration-200 py-2 px-1 xs:px-2 md:px-4 lg:px-10 text-white h-10"
      >
        Book a call
      </button> -->
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useBookingStore } from "@/stores/booking";

const searchInput = ref("");
const emits = defineEmits(["shouldFilter", "getNewFilter"]);
const bookingStore = useBookingStore();

//Modal
const showFilter = ref(false);
const makeModalShow = () => {
  showFilter.value = true;
};
function getNewFilter(query: any) {
  showFilter.value = false;
  console.log(query);
  emits("getNewFilter", query);
}

// const filterBooking = () => {
//   bookingStore.filterBooking(searchInput.value);
//   if (searchInput.value === "") {
//     emits("shouldFilter", false);
//   } else {
//     emits("shouldFilter", true);
//   }
// };
// const exportBooking = () => {
//   emits('exportBooking')
// }

watch(searchInput, () => {
  bookingStore.filterBooking(searchInput.value);
  if (searchInput.value === "") {
    emits("shouldFilter", false);
  } else {
    emits("shouldFilter", true);
  }
});

bookingStore.fetchCallers();


</script>