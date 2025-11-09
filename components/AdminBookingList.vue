<template>
  <div>
    <div class="relative overflow-x-auto pb-10 xl:pb-16">
      <!-- max-h-[calc(100vh-100px)] -->
      <table class="w-full text-sm text-left text-stone-800">
        <thead class="text-xs text-stone-900 uppercase bg-gray-50">
          <tr>
            <!-- <th scope="col" class="p-4 sticky top-0">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th> -->
            <th scope="col" class="px-6 py-3 sticky top-0">Order ID</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Client</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Type of call</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Loved one name</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Date of order</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Status</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Assignee</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in orderedBookindList"
            @click="viewBooking(item._id, false)"
            :key="i"
            class="bg-white border-b hover:bg-emerald-500/10 font-medium hover:!text-black relative transition-all duration-300"
          >
            <!-- <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2">
                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
              </div>
            </td> -->
            <th
              scope="row"
              class="px-6 py-4 font-medium hover:!text-emerald-600 cursor-pointer whitespace-nowrap transition-all duration-300"
            >
              <ClickToCopy
                :toDisplay="truncateBookingRef(item._id)"
                :toCopy="item._id"
                @doNotRedirect="viewBooking(item._id, true)"
                @copied="
                  toasterStore.showToaster({
                    message: 'copied',
                    type: 'success',
                  })
                "
              />
            </th>
            <td class="px-6 py-4">
              {{ item.createdBy?.fullName }}
            </td>
            <td class="px-6 py-4">
              {{ item.category?.name }}
            </td>
            <td class="px-6 py-4" :title="item.fullName">
              {{ reduceName(item.fullName) }}
            </td>
            <td class="px-6 py-4">
              <span class="flex items-center gap-1 whitespace-nowrap">
                <svg
                  class="w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  ></path>
                </svg>
                {{ formatDate(String(item.createdAt)) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <BookingStatusVue
                :status="item.status"
                :bookingId="item._id"
                @doNotRedirect="viewBooking(item._id, true)"
                :style="`z-index:${orderedBookindList.length - i}`"
              />
            </td>
            <td class="px-6 py-4">
              <BookingAssignees
                :bookingAssignee="
                  item.assignedTo || { _id: null, name: 'Unassigned' }
                "
                :assigneeList="assigneeList"
                @doNotRedirect="viewBooking(item._id, true)"
                :bookingId="item._id"
                :style="`z-index:${orderedBookindList.length - i}`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="fixed bottom-0 sm:bottom-[32px] inset-x-0 sm:pl-[200px] px-2 sm:px-[32px] z-[50]"
      >
        <div class="border w-full"></div>
        <PaginationComponent
          class="p-2 bg-white rounded-b-xl"
          :totalOnCurrentPage="totalOnCurrentPage"
          :totalItemCount="bookindList?.pagination?.total ?? 0"
          :perPage="bookindList?.pagination?.perPage ?? 0"
          :currentPage="bookindList?.pagination?.pageNumber ?? 0"
          @pagechanged="($event) => onPageChange($event, undefined)"
        ></PaginationComponent>
      </div>
    </div>
    <div
      v-if="loadingBookingList"
      class="flex flex-col h-40 items-center justify-center text-center"
    >
      fetching bookings...
      <Loader class="[&>*]:bg-primary" />
    </div>
    <div
      v-else-if="!loadingBookingList && orderedBookindList.length === 0"
      class="flex h-40 items-center justify-center text-center"
    >
      No data
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from "@/stores/booking";
import { useToasterStore } from "@/stores/toaster";
import { BookingType } from "@/types/booking";
import { ref, computed } from "vue";
import BookingStatusVue from "@/components/booking/BookingStatus.vue";

const props = defineProps<{
  shouldFilter: boolean | null;
  newFilterQuery: any;
}>();

const nameLength = ref(10);
const emits = defineEmits(["pagechanged"]);
const toasterStore = useToasterStore();
const bookingStore = useBookingStore();
const bookindList = computed(() => bookingStore.bookingList);
const filteredBookingList = computed(() => bookingStore.filteredBookingList);
// const orderedBookindList = computed(() => []) // seen by only admin
const orderedBookindList = computed(() => {
  if (props.shouldFilter && bookingStore.filteredBookingList?.data.length > 0) {
    return bookingStore.getOrderedBookingList(
      filteredBookingList.value?.data || [],
      "desc"
    );
  } else if (
    props.shouldFilter &&
    bookingStore.filteredBookingList?.data.length === 0
  ) {
    return [];
  } else {
    // console.log(bookingList?.value?.data);
    return bookingStore.getOrderedBookingList(
      bookindList.value?.data || [],
      "desc"
    );
  }
});
console.log(orderedBookindList.value);
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
function reduceName(name: string) {
  if (name.length > nameLength.value) {
    return name.substring(0, nameLength.value) + "...";
  } else {
    return name;
  }
}

const loadingBookingList = computed(() => bookingStore.requesting);
// const loadingBookingList = computed(() => true)

const truncateBookingRef = (ref: string) => {
  return (
    ref.substring(0, 3) + "..." + ref.substring(ref.length - 3, ref.length)
  );
};

// pagination related
const totalOnCurrentPage = computed(() => {
  // console.log(orderedBookindList.value);
  return orderedBookindList.value && orderedBookindList.value.length
    ? orderedBookindList.value.length
    : 0;
});
const onPageChange = async (page: number, searchQuery: string | undefined) => {
  try {
    if (props.newFilterQuery !== null) {
      await bookingStore.fetchBookingList({
        pageNumber: page,
        perPage: 10,
        isPublished: true,
        ...props.newFilterQuery,
      });
      return;
    }
    await bookingStore.fetchBookingList({
      pageNumber: page,
      perPage: 10,
      isPublished: true,
    });
  } catch (error) {
    toasterStore.showToaster({
      message:
        error?.message ?? "We are unable to fetch booking list at the moment",
      type: "error",
    });
  }
};

const router = useRouter();
let run = false;
const viewBooking = (bookingId: string, shouldNotRedirect: boolean) => {
  if (!run) {
    if (shouldNotRedirect) {
      run = true;
      setTimeout(() => {
        run = false;
      }, 2000);
      return;
    }
  }
  if (!run && !shouldNotRedirect) {
    router.push(`/view/${bookingId}`);
  }
};

// fake assignee
bookingStore.fetchCallers();

const assigneeList = computed(() => {
  const callers = bookingStore.callers;
  callers.unshift({ name: "Unassigned", _id: null });
  // console.log(callers);
  return callers;
});
</script>