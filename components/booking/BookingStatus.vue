<template>
  <div
    class="relative inline-flex self-center items-center"
    @click="$emit('doNotRedirect', true)"
  >
    <CustomSelect
      :options="bookingStatusList"
      :default="'go'"
      class="select min-w-[160px]"
      v-model="bookingStatus"
      @update:modelValue="updateStatus"
      :disabled="requesting"
    />
    <StatusColor :status="bookingStatus" class="absolute left-2" />

    <div
      v-show="requesting"
      class="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center rounded-lg"
    >
      <Loader class="mx-auto [&>*]:bg-primary" />
    </div>
  </div>
  <Modal v-model="mustAddReason" @click="$emit('doNotRedirect', true)">
    <form @submit.prevent="sendReason" class="container mx-auto">
      <div class="px-3 sm:px-8 py-10 md:min-w-[40rem]">
        <h2 class="text-xl sm:text-3xl text-primary font-semibold mb-2">
          Reason for rejection
        </h2>
        <div class="sm:text-lg mt-4">
          <label for="why" class="block mb-2 text-stone-400"
            >Why do you want to reject this call</label
          >
          <select
            name="why"
            id=""
            required
            v-model="reasonTitle"
            class="border border-stone-400 focus:border-primary outline-none p-2 rounded-2xl relative w-[100%] sm:w-[80%] duration-200"
          >
            <option value="" class="mb-5">Reason for call rejection</option>
            <option
              class="mb-2"
              :value="reason.value"
              v-for="reason in reasonOptions"
              :key="reason.value"
            >
              {{ reason.name }}
            </option>
          </select>
        </div>
        <div class="sm:text-lg mt-6">
          <label for="reason" class="block text-stone-400"
            >Reason not specified? let us know here</label
          >
          <textarea
            name="reason"
            id=""
            required
            v-model="reasonDescription"
            class="border border-stone-400 focus:border-primary outline-none p-2 rounded-2xl w-[100%] sm:w-[80%] h-[12rem] mt-2 duration-200"
            placeholder="Please let us know why you're cancelling"
          ></textarea>
        </div>
      </div>
      <div class="flex justify-center md:justify-end mb-4 mr-6">
        <button
          class="text-white bg-primary hover:bg-primary-faded px-12 py-3 font-semibold rounded-md duration-200"
        >
          Done
        </button>
      </div>
    </form>
  </Modal>

  <Modal v-model="reasonSent">
    <div
      class="container mx-auto text-center class py-10 sm:py-20 px-4 md:px-20"
    >
      <img src="/call-rejected.png" alt="" class="mx-auto" />
      <div class="mt-6">
        <h2 class="text-xl sm:text-2xl mb-2 font-bold">Call Rejected</h2>
        <p class="sm:text-lg">
          We will inform the user about the call rejection
        </p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { BookingStatus } from "@/types/booking";
import { useBookingStore } from "@/stores/booking";
import { useToasterStore } from "@/stores/toaster";
import StatusColor from "@/components/booking/StatusColor.vue";

interface Props {
  bookingId: string;
  status: BookingStatus;
}

const reasonTitle = ref("");
const mustAddReason = ref(false);
const reasonSent = ref(false);
const reasonDescription = ref("");
const emit = defineEmits(["doNotRedirect"]);
const props_ = defineProps<Props>();
const requesting = ref(false);
const bookingStatus = ref(
  Object.entries(BookingStatus).find(
    ([key, value]) => key === props_.status
  )?.[1] as BookingStatus
);
const bookingStatusList = ref(Object.values(BookingStatus));
const reasonOptions = ref([
  { name: "Wrong call time (8:50am to 10pm)", value: "wrong_time" },
  { name: "Wrong Location", value: "wrong_location" },
  { name: "Wrong Purpose", value: "wrong_purpose" },
  { name: "Erotic Words", value: "erotic_words" },
  { name: "Abusive Words", value: "abusive_words" },
  { name: "Physical Abuse of Happivibe", value: "physical_abuse" },
  { name: "Sexual Abuse of Happivibe", value: "sexual_abuse" },
]);

watchEffect(() => {
  bookingStatus.value = Object.entries(BookingStatus).find(
    ([key, value]) => key === props_.status
  )?.[1] as BookingStatus;

  if (
    bookingStatus.value !== BookingStatus.PENDING &&
    bookingStatusList.value.includes(bookingStatus.value)
  ) {
    const index = bookingStatusList.value.indexOf(BookingStatus.PENDING);
    if (index !== -1) bookingStatusList.value.splice(index, 1); // remove PENDING if booking status is not PENDING
  }
});

const bookingStore = useBookingStore();
const toasterStore = useToasterStore();
const updateStatus = async () => {
  if (bookingStatus.value === BookingStatus.REJECTED) {
    mustAddReason.value = true;
    // console.log("The Ststua is rejecting");
    return;
  }
  await changeBookingStatus();
};

const changeBookingStatus = async () => {
  requesting.value = true;

  const payload = {
    bookingId: props_.bookingId,
    status: Object.entries(BookingStatus).find(
      ([key, value]) => value === bookingStatus.value
    )?.[0] as BookingStatus,
    reason: "",
  };
  if (mustAddReason.value) {
    payload["reason"] = reasonDescription.value;
    payload.status = "REJECTED";
  }
  console.log("The payload is", payload);

  const res = await bookingStore.updateBookingStatus({ ...payload });

  requesting.value = false;
  if (!res) {
    toasterStore.showToaster({
      type: "error",
      message: "Failed to update booking status",
    });
    return;
  }

  toasterStore.showToaster({
    type: "success",
    message: "Booking status updated",
  });
};

// Reason
const sendReason = async () => {
  console.log("The reason title", reasonTitle.value);
  console.log("The reason is", reasonDescription.value);

  await changeBookingStatus();
  mustAddReason.value = false;
  reasonSent.value = true;
};
</script>