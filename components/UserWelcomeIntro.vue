<template>
  <Modal v-model="showIntroModal">
    <div
      class="flex flex-col items-center justify-center w-full gap-2 py-10 px-20 transition-all duration-300"
    >
      <img
        v-show="introStage === 1"
        src="/images/call-center.svg"
        class="slideDown w-[200px] mb-4"
        alt=""
      />
      <img
        v-show="introStage === 2"
        src="/images/call-illustration.svg"
        class="slideDown w-[200px] mb-4"
        alt=""
      />
      <img
        v-show="introStage === 3"
        src="/images/welcome.svg"
        class="slideDown w-[200px] mb-4"
        alt=""
      />

      <template v-if="introStage === 1">
        <h3 class="font-semibold text-xl">
          Making your loved ones happy with one click
        </h3>
        <p>
          Click on BOOK A CALL and fill out the information of your loved one
        </p>
        <button
          @click="introStage = 2"
          class="p-2 px-16 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300"
        >
          skip
        </button>
      </template>

      <template v-if="introStage === 2">
        <h3 class="font-semibold text-xl">Make any type of call</h3>
        <p>
          We will call to apologize, appreciate, celebrate, checkup and even
          call you if you need a call
        </p>
        <button
          @click="introStage = 3"
          class="p-2 px-16 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300"
        >
          skip
        </button>
      </template>

      <template v-if="introStage === 3">
        <h3 class="font-semibold text-xl">Welcome Onboard</h3>
        <p>
          This is the uber of happiness, we are always here to make you and your
          loved ones happy
        </p>
        <button
          @click="finalizeIntro"
          class="p-2 px-16 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300"
        >
          Start
        </button>
      </template>

      <div class="h-2 w-full bg-gray-300 mt-3 rounded-full">
        <div
          class="h-full bg-primary rounded-full transition-all duration-500"
          :style="`width:${interoPercentage}%`"
        ></div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { UserType } from "@/types/auth";

const authStore = useAuthStore();
const profileType = computed(() => authStore.getProfileType);

const showIntroModal = ref(false);
const introStage = ref(1);
const interoPercentage = computed(() => (introStage.value / 3) * 100);
const AutoPlayIntro = () => {
  const interval = setInterval(() => {
    if (introStage.value < 3) {
      introStage.value += 1;
    } else {
      clearInterval(interval);
    }
  }, 3000);
};
const finalizeIntro = () => {
  localStorage.setItem("showIntroModal", JSON.stringify(false));
  // localStorage.removeItem("showIntroModal");
  showIntroModal.value = false;
};

onMounted(function () {
  if (profileType.value === UserType.USER) {
    let showIntroModal_ = localStorage.getItem("showIntroModal");
    if (showIntroModal_) {
      showIntroModal_ = JSON.parse(showIntroModal_);
      if (showIntroModal_) {
        showIntroModal.value = true;
        AutoPlayIntro();
        return;
      } else {
        showIntroModal.value = false;
      }
      return;
    }
    showIntroModal.value = false;
    AutoPlayIntro();
  }
});
</script>