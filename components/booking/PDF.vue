<template>
  <div>
    <!-- Client Details -->
    <div>
      <h2 class="font-bold mb-2 text-lg">Client Details</h2>
      <div
        v-for="detail in newClientDetails"
        :key="detail[0]"
        class="flex items-center space-x-4"
      >
        <strong class="capitalize"> {{ detail[0] }}: </strong>
        <span>{{ detail[1] || "N/A" }}</span>
      </div>
    </div>
    <!-- Client details end -->
    <!-- Loved one details -->
    <div class="mt-7">
      <h2 class="font-bold mb-2 text-lg">Loved One Details</h2>
      <div
        v-for="detail in newClientLoveOne"
        :key="detail[0]"
        class="flex items-center space-x-4"
      >
        <strong class="capitalize"> {{ detail[0] }}: </strong>
        <span>{{ detail[1] }}</span>
      </div>
    </div>
    <!-- About Loved One -->
    <div class="mt-7">
      <h2 class="font-bold mb-2 text-lg">About Loved One</h2>
      <div
        v-for="detail in newAboutLOvedOne"
        :key="detail[0]"
        class="flex items-center space-x-4"
      >
        <strong class="capitalize"> {{ detail[0] }}: </strong>
        <span>{{ detail[1] || "N/A" }}</span>
      </div>
    </div>
    <!-- Call Settings -->
    <div class="mt-7">
      <h2 class="font-bold mb-2 text-lg">Call Settings</h2>
      <div
        v-for="detail in newCallSettings"
        :key="detail[0]"
        class="flex items-center space-x-4"
      >
        <strong class="capitalize"> {{ detail[0] }}: </strong>
        <span>{{ detail[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookingData } from "@/types/booking";
import { ref } from "vue";

const props = defineProps<{
  booking: BookingData;
  clientDetails: any;
}>();

const clientTitle = ref(props.booking.createdBy.title || "N/A");
const clientFullName = ref(
  props.booking.createdBy.fullName?.replace(/"[]/g, "") || "N/A"
);
const clientPhoneNumber = ref(
  props.booking.createdBy.phoneNumber?.replace(/"[]/g, "") || "N/A"
);
const clientGender = ref(
  props.booking.createdBy.gender?.replace(/"[]/g, "") || "N/A"
);
const clientMaritalStatus = ref(
  props.booking.createdBy.maritalStatus?.replace(/"[]/g, "") || "N/A"
);
const clientLocation = ref(
  props.booking.createdBy.location?.replace(/"[]/g, "") || "N/A"
);
console.log(clientTitle.value);

// AClient love one
const clientLovedOneTitle = ref(props.booking.title || "N/A");
const clientLovedOneName = ref(props.booking.fullName || "N/A");
const clientLovedOnePhoneNumber = ref(props.booking.phoneNumber || "N/A");
const clientLovedOneGender = ref(props.booking.gender || "N/A");
const clientLovedOneMaritalStatus = ref(props.booking.maritalStatus || "N/A");
const clientLovedOneLocation = ref(props.booking.location || "N/A");

// About loved one
const relationship = ref(props.booking.relationshipToUser || "N/A");
const clientPetName = ref(props.booking.userPetNamesForClient || "N/A");
const loveOnePetName = ref(props.booking.clientPetNamesForUser || "N/A");
const language = ref(props.booking.nativeLanguege || "N/A");
const callType = ref(props.booking.category.name || "N/A");
const loveOneNames = ref(props.booking.userNickNames || "N/A");
const purposeOfCall = ref(props.booking.reasonForCall || "N/A");
const customMessage = ref(props.booking.customMessage || "N/A");
const favouriteSong = ref(props.booking.favouriteSong || "N/A");
const favouriteMemories = ref(props.booking.favouriteMemories || "N/A");

// Call Settings
const callTime = ref(props.booking.availabilityCalendar[0].from || "N/A");
const time = new Date(callTime.value);
const recordCall = ref(props.booking.isRecorded == false ? "No" : "Yes");
const chargeType = ref(props.booking.chargeType || "N/A");

const clientLovedOne = {
  "Full Name": clientLovedOneName.value,
  Location: clientLovedOneLocation.value,
  "Phone Number": clientLovedOnePhoneNumber.value,
  Gender: clientLovedOneGender.value,
  "Marital Status": clientLovedOneMaritalStatus.value,
  Title: clientLovedOneTitle.value,
};
const clientDetails = {
  "Full Name": clientFullName.value,
  "Phone Number": clientPhoneNumber.value,
  Gender: clientGender.value,
  Location: clientLocation.value,
  Title: clientTitle.value,
  "Marital Status": clientMaritalStatus.value,
};

const aboutLovedOne = {
  Relationship: relationship.value,
  Language: language.value,
  "Client Pet Name": clientPetName.value.join(", "),
  "Love one pet name": loveOnePetName.value.join(", "),
  "Love one nicknames": loveOneNames.value.join(", "),
  "Call Type": callType.value,
  "Purpose of call": purposeOfCall.value,
  "Use your words": customMessage.value,
  "Favourite Songs": favouriteSong.value,
  "Favourite Memories": favouriteMemories.value,
};

const callSettings = {
  "Caller Gender": clientGender.value,
  "Call Time": time,
  "Record the Call": recordCall.value,
  "Payment Package": chargeType.value,
};

const newClientDetails = Object.entries(clientDetails);
const newClientLoveOne = Object.entries(clientLovedOne);
const newAboutLOvedOne = Object.entries(aboutLovedOne);
const newCallSettings = Object.entries(callSettings);
</script>