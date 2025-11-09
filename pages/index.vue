<template>
  <div class="flex-grow p-2 xs:p-3 sm:p-6 flex flex-col">
    <template v-if="profileType === UserType.ADMIN">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h1 class="font-semibold">Order list</h1>
          <p class="h-5 mr-4 cursor-pointer" @click="refreshBookingList">
            Refresh
          </p>
        </div>
        <hr class="h-[2px] bg-black bg-opacity-10 mb-6" />
        <BookingSearch
          @shouldFilter="alterFilter"
          @exportBooking="exportBooking"
          @getNewFilter="getNewFilter"
        />
        <div ref="bookingList">
          <AdminBookingList :shouldFilter="shouldFilter" :newFilterQuery="newFilterQuery"/>
        </div>
      </div>
    </template>

    <template v-if="profileType === UserType.USER">
      <div class="flex justify-start gap-4">
        <div
          class="w-14 flex items-center justify-center aspect-square bg-primary rounded-full p-[3px]"
        >
          <img
            v-if="avatar"
            class="w-full h-full object-cover rounded-full"
            :src="avatar"
            alt="avatar"
          />
          <svg
            v-else
            fill="currentColor"
            class="w-8 h-8"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            ></path>
          </svg>
        </div>
        <div
          class="flex-grow flex flex-col justify-between text-lg font-semibold"
        >
          <span>Welcome</span>
          <span>{{ fullname }}</span>
        </div>
      </div>

      <SkeletalScreenBookings v-if="requesting" class="mt-6" />
      <div
        v-if="!hasMadeFirstBooking && !requesting"
        class="flex-grow flex flex-col items-center justify-center gap-3"
      >
        <img
          src="/images/call-center.svg"
          class="w-60"
          alt="call-center illustration"
        />
        <p class="text-lg font-light mx-auto max-w-lg text-center">
          You have not made any Bookings yet, book a call now and let us bring
          happiness to you and your loved ones
        </p>
        <!-- <p>{{ requesting }} {{ !requesting }}</p> -->
        <button
          @click="showBookingModal = true"
          class="p-4 px-16 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300"
        >
          Book a Call
        </button>
      </div>
      <UserBookingList
        @bookcall="showBookingModal = true"
        v-if="hasMadeFirstBooking && !requesting"
        class="mt-6"
        @editDraft="editDraft"
      />

      <UserWelcomeIntro />

      <Modal v-model="showBookingModal">
        <div
          class="sm:flex flex-col items-center justify-center w-full gap-2 py-10 px-10"
        >
          <div class="sm:w-[500px] transition-all duration-300">
            <h3 class="text-xl font-bold text-primary">Booking details</h3>
            <p class="text-slate-500">Fill in your required information</p>

            <p class="mt-6">
              Who are you booking for? <span class="text-red-600">*</span>
            </p>
            <div class="text-xl space-y-3 mt-3">
              <label class="block cursor-pointer">
                <input
                  v-model="bookingFor"
                  type="radio"
                  name="bookingFor"
                  class="hidden peer"
                  :value="BookingType.SELF"
                />
                <div
                  class="peer-checked:[&>div]:ring-4 peer-checked:[&>div]:ring-inset peer-checked:[&>div]:ring-primary peer-checked:[&>main>span]:font-bold flex items-start gap-3"
                >
                  <div
                    class="min-w-[20px] max-w-[20px] aspect-square border-2 border-primary rounded-full mt-1"
                  >
                    <!-- hey -->
                  </div>
                  <main>
                    <span
                      class="flex-grow text block transition-all duration-100"
                      >I’m booking for myself</span
                    >
                    <em class="block text-sm text-slate-500"
                      >You are booking for a loved one personally</em
                    >
                  </main>
                </div>
              </label>

              <label class="block cursor-pointer">
                <input
                  v-model="bookingFor"
                  type="radio"
                  name="bookingFor"
                  class="hidden peer"
                  :value="BookingType.GUEST"
                />
                <div
                  class="peer-checked:[&>div]:ring-4 peer-checked:[&>div]:ring-inset peer-checked:[&>div]:ring-primary peer-checked:[&>main>span]:font-bold flex items-start gap-3"
                >
                  <div
                    class="min-w-[20px] max-w-[20px] aspect-square border-2 border-primary rounded-full mt-1"
                  >
                    <!-- hey -->
                  </div>
                  <main>
                    <span
                      class="flex-grow text block transition-all duration-100"
                      >I’m booking for someone else</span
                    >
                    <em class="block text-sm text-slate-500"
                      >You are booking for a loved one on behalf of someone</em
                    >
                  </main>
                </div>
              </label>
            </div>

            <div class="mt-20 flex sm:justify-end gap-4 font-bold">
              <button
                @click="showBookingModal = false"
                class="p-2 sm:px-16 border border-primary hover:border-orange-500 text-primary hover:text-orange-500 rounded-lg transition-colors duration-300 flex-grow sm:flex-grow-0 text-center"
              >
                Back
              </button>
              <NuxtLink
                to="/booking"
                class="p-2 sm:px-16 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300 flex-grow sm:flex-grow-0 text-center"
              >
                Next
              </NuxtLink>
            </div>
          </div>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BookingType, ClientBookingListTabs } from "@/types/booking";
import { UserType } from "@/types/auth";
import { useAuthStore } from "@/stores/auth";
import { useBookingStore } from "@/stores/booking";
import { useToasterStore } from "@/stores/toaster";
import { ref } from "vue";

definePageMeta({
  name: "dashboard",
  middleware: ["auth"],
});

const bookingStore = useBookingStore();
const toasterStore = useToasterStore();
const usersBookingList = computed(() => bookingStore.currentUsersBookingList);
const userHasMadeFirstBooking = computed(
  () => !!usersBookingList.value?.data.length
);
const hasMadeFirstBookingCookie = useCookie("hasMadeFirstBooking", {
  default: () => false,
  watch: true,
});
const hasMadeFirstBooking = computed(
  () => hasMadeFirstBookingCookie.value || userHasMadeFirstBooking.value
);
const requesting = computed(() => bookingStore.requesting);
const isPublished = computed(
  () => bookingStore.selectedBookingListTab === ClientBookingListTabs.paid
);
onMounted(async function () {
  if (profileType.value === UserType.USER) {
    // naturally this request should be made on each mount but
    // because all thats important now is knowing if the user has a booking
    if (!hasMadeFirstBooking.value) {
      bookingStore.fetchCurrentUsersBookingList({
        perPage: 10,
        isPublished: isPublished.value,
      });
    }
  }
  if (profileType.value === UserType.ADMIN) {
    try {
      await bookingStore.fetchBookingList({ perPage: 10, isPublished: true });
    } catch {
      toasterStore.showToaster({
        message: "An error occured while fetching booking list",
        type: "error",
      });
    }
  }
});

const refreshBookingList = async () => {
  await bookingStore.fetchBookingList({ perPage: 10, isPublished: true });
};

// booking form
const showBookingModal = ref(false);
const bookingFor = ref(bookingStore.bookingFor || BookingType.SELF);

// set booking type used in the booking page
const bookingType = useCookie("bookingType");
watch(bookingFor, (val) => (bookingType.value = val), { immediate: true });

const authStore = useAuthStore();
const fullname = computed(
  () => authStore.user?.fullName || authStore.user?.email
);
const avatar = computed(() =>
  authStore.user?.imageUrl && authStore.user?.imageUrl !== "N/A"
    ? authStore.user?.imageUrl
    : "https://ui-avatars.com/api/?name=" + fullname.value
);
const profileType = computed(() => authStore.getProfileType);

// Filter
const shouldFilter = ref(null);
const alterFilter = (val: boolean) => {
  shouldFilter.value = val;
};

// Export PDF
const bookingList = ref(null);
const exportBooking = () => {
  html2pdf(bookingList.value.innerHTML, {
    margin: 1,
    filename: `booking-page.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 5,
      logging: true,
      letterRendering: true,
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  });
};

const newFilterQuery = ref(null);
async function getNewFilter(query) {
  console.log(query);
  newFilterQuery.value = query;
  const newQuery = { ...query, perPage: 10, isPublished: true };
  try {
    await bookingStore.fetchFilteredBooking(newQuery);
  } catch (error) {
    console.log(error);
  }
}

//ABle to Edit Draft
// const ableToEdit = ref(false);
// const editDraft = (id) => {};
</script>

<style scoped>
.slideDown {
  animation: slideDown 1s ease-in-out;
}
@keyframes slideDown {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>