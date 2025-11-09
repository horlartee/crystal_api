<template>
  <div>
    <div class="flex justify-end">
      <button
        @click="() => emits('bookcall')"
        class="p-2 px-10 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300"
      >
        Book a Call
      </button>
    </div>
    <div class="mt-4 border-b-2 border-primary">
      <Tabs
        v-model="bookingStore.selectedBookingListTab"
        :tab_list="Object.values(ClientBookingListTabs)"
        @tab-click="($event) => fetchBookingListByTab($event)"
        class="[&>*]:inline-block [&>*]:w-1/2 sm:[&>*]:w-auto"
        query_name="list"
      >
        <template #tab="{ tab, is_active }">
          <button
            :class="is_active ? 'bg-primary ring-black' : 'bg-gray-100'"
            class="p-2 px-10 transition-colors duration-300 w-full sm:w-auto capitalize font-medium outline-none ring-2 ring-inset ring-transparent"
          >
            {{ tab }}
          </button>
        </template>
      </Tabs>
    </div>
    <div v-if="!requesting" class="relative overflow-x-auto">
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
            <th scope="col" class="px-6 py-3 sticky top-0">Recipient</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Type of call</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Order Date</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Date of Call</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Amount</th>
            <th scope="col" class="px-6 py-3 sticky top-0">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="editDraft(item._id)"
            v-for="(item, i) in orderedBookindList"
            :key="i"
            :class="
              $route.query.list && $route.query.list === 'draft'
                ? 'cursor-pointer'
                : ''
            "
            class="bg-white border-b hover:bg-emerald-500/10 font-medium hover:!text-black relative transition-all duration-300"
          >
            <!-- <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2">
                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
              </div>
            </td> -->
            <td
              scope="row"
              class="px-6 py-4 font-medium hover:!text-emerald-600 cursor-pointer whitespace-nowrap transition-all duration-300"
            >
              <ClickToCopy
                :toDisplay="'#' + truncateBookingRef(item._id)"
                :toCopy="item._id"
                :hideIcon="true"
                @copied="
                  toasterStore.showToaster({
                    message: 'copied',
                    type: 'success',
                  })
                "
              />
            </td>
            <td class="px-6 py-4">
              {{
                item.bookingType === BookingType.GUEST
                  ? item.guestDetails?.fullName
                  : item.fullName
              }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ getCallType(item.category) }}
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
                <ul>
                  <li v-for="(date_, n) in item.availabilityCalendar" :key="n">
                    {{ formatDate(String(date_.from)) }}
                  </li>
                </ul>
              </span>
            </td>
            <td class="px-6 py-4">
              {{ item.price }}
            </td>
            <td class="px-6 py-4">
              <BookingStatusClient :status="item.status" />
            </td>
            <!-- <NuxtLink :to="`/edit/${item._id}`" class="group absolute inset-0 flex items-center ">
              <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                class="w-5 invisible group-hover:visible transition-all duration-100 absolute right-1 text-primary" viewBox="0 0 528.899 528.899"
                xml:space="preserve">
                <g>
                  <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                    c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                    C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                    L27.473,390.597L0.3,512.69z"/>
                </g>
              </svg>
            </NuxtLink> -->
          </tr>
        </tbody>
      </table>

      <div
        class="fixed bottom-0 sm:bottom-[32px] inset-x-0 sm:pl-[200px] px-2 sm:px-[32px] z-[50]"
        :class="[
          {
            hidden:
              (bookindList?.pagination?.total ?? 0) <=
              (bookindList?.pagination?.perPage ?? 0),
          },
        ]"
      >
        <div class="border w-full"></div>
        <PaginationComponent
          class="p-2 bg-white rounded-b-xl"
          :totalOnCurrentPage="totalOnCurrentPage"
          :totalItemCount="Number(bookindList?.pagination?.total) ?? 0"
          :perPage="Number(bookindList?.pagination?.perPage) ?? 0"
          :currentPage="Number(bookindList?.pagination?.pageNumber) ?? 0"
          @pagechanged="($event) => onPageChange($event, undefined)"
        ></PaginationComponent>
      </div>
    </div>
    <div
      v-if="requesting"
      class="flex flex-col h-40 items-center justify-center text-center max-w-lg bg-gray-100 rounded-3xl mx-auto mt-10"
    >
      fetching bookings...
      <Loader class="[&>*]:bg-primary" />
    </div>
    <div
      v-else-if="!requesting && orderedBookindList.length === 0"
      class="flex h-40 items-center justify-center text-center"
    >
      No data
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from "@/stores/booking";
import { useToasterStore } from "@/stores/toaster";
import { BookingType, ClientBookingListTabs } from "@/types/booking";
import BookingStatusClient from "@/components/booking/BookingStatusClient.vue";

const emits = defineEmits(["bookcall", "editDraft"]);
const toasterStore = useToasterStore();
const bookingStore = useBookingStore();
const router = useRouter();
const bookindList = computed(() => bookingStore.currentUsersBookingList);
// const orderedBookindList = computed(() => []) // seen by only admin
const orderedBookindList = computed(() =>
  bookingStore.getOrderedBookingList(bookindList.value?.data || [], "desc")
); // seen by only admin
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const truncateBookingRef = (ref: string) => {
  return (
    ref.substring(0, 3) + "..." + ref.substring(ref.length - 3, ref.length)
  );
};

// pagination related
const totalOnCurrentPage = computed(() => {
  return orderedBookindList.value && orderedBookindList.value.length
    ? orderedBookindList.value.length
    : 0;
});
const isPublished = computed(
  () => bookingStore.selectedBookingListTab === ClientBookingListTabs.paid
);
interface Args {
  pageNumber?: number;
  perPage?: number;
  isPublished?: boolean;
}
const requesting = ref(false);
const fetchBookingList = async ({ pageNumber, perPage, isPublished }: Args) => {
  requesting.value = true;
  try {
    await bookingStore.fetchCurrentUsersBookingList({
      pageNumber,
      perPage,
      isPublished,
    });
  } catch (error) {
    toasterStore.showToaster({
      message:
        error?.message ?? "We are unable to fetch booking list at the moment",
      type: "error",
    });
  }
  requesting.value = false;
};

const onPageChange = (page: number, searchQuery: string | undefined) => {
  fetchBookingList({
    pageNumber: page,
    isPublished: isPublished.value,
  });
};

const fetchBookingListByTab = (tab: string) =>
  fetchBookingList({ isPublished: isPublished.value });
const callTypes = computed(() => bookingStore.callTypes);
// fetch call types if not already fetched
onMounted(() => {
  if (bookingStore.callTypes.length) return;
  bookingStore.fetchCallTypes();
});
const getCallType = computed(
  () => (callType: string) =>
    callTypes.value.find((c) => c._id === callType)?.name || "Call Type"
);

// Edit the Draft
const editDraft = (id: string) => {
  router.push(`/?edit=true&id=${id}`);
  emits("editDraft", id);
};
</script>