<template>
  <div class="flex w-full flex-col justify-center text-center sm:text-start">
    <nuxt-link to="/signup" class="my-4 hover:opacity-80 duration-200">
      <img src="/back-button.png" alt="" title="Go back" />
    </nuxt-link>
    <h2 class="text-3xl 2xl:text-[48px] mb-2">Verify your email</h2>
    <p>
      Enter the code sent via email to
      <strong>{{ emailVerification.email }}</strong>
    </p>
    <OTPCollector
      class="mt-8 mx-auto sm:mx-[unset]"
      @on-complete="emailVerification.otp = $event"
    />

    <p class="mt-4">
      <strong>{{ timer }}</strong> Didn’t get code?
      <button
        @click="resendCode(emailVerification.email)"
        :class="[
          canResend ? 'text-primary' : 'text-gray-400 cursor-not-allowed',
        ]"
        class="font-semibold"
      >
        Resend code
      </button>
      <!-- </button> or
      <NuxtLink to="/login" class="text-primary font-semibold">Change Email</NuxtLink> -->
    </p>

    <div class="px-1">
      <select
        @change="verify"
        v-model="emailVerification.howYouHeard"
        class="mt-8 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        name="how-you-heard"
      >
        <option value="">How you heard about us</option>
        <option value="google">Google</option>
        <option value="facebook">Facebook</option>
        <option value="twitter">Twitter</option>
        <option value="instagram">Instagram</option>
        <option value="friend">Friend</option>
      </select>
    </div>

    <div class="pt-2 px-2">
      <Loader class="[&>*]:bg-primary" v-if="verifying" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useToasterStore } from "@/stores/toaster";
import { User, UserType } from "@/types/auth";

definePageMeta({
  name: "email-verification",
  layout: "auth",
});

const emailVerification = reactive({
  otp: "",
  email: "",
  howYouHeard: "",
});

const authStore = useAuthStore();
const toasterStore = useToasterStore();
onMounted(() => (emailVerification.email = authStore.getEmail ?? ""));
interface TempUser {
  email: string;
  password: string;
}
onMounted(() => {
  // if user got to this page and don't have a token, they
  // probably got here from login because they didn't verify their email
  // so we resend the code
  if (authStore.getUserId) return;
  const user = useCookie<TempUser>("tempStoredUser");
  emailVerification.email = user.value.email;
  setTimeout(() => resendCode(user.value.email), 1000);
});
// create 01:00 minute timer in the form of 00:00
const timer = ref("00:00");
const timerInterval = ref(null);
const startTimer = () => {
  let minutes = 1;
  let seconds = 0;
  timerInterval.value = setInterval(() => {
    if (seconds === 0) {
      minutes--;
      seconds = 60;
    }
    seconds--;
    timer.value = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    const resendTimer = useCookie("resendTimer");
    resendTimer.value = timer.value;
    if (minutes === 0 && seconds === 0) {
      clearInterval(timerInterval.value);
    }
  }, 1000);
};

const canResend = computed(() => timer.value === "00:00");
const verifying = computed(() => authStore.requesting);
const router = useRouter();
const verify = async () => {
  try {
    const res = await authStore.emailVerification({
      email: emailVerification.email,
      OTPCode: emailVerification.otp,
      howYouheardAboutUs: emailVerification.howYouHeard,
    });
    toasterStore.showToaster({
      message: "Email verified",
      type: "success",
    });
    authStore.user.isEmailVerified = true;

    // if we've verified the email of a revisiting user, we need to
    // automatically log them in
    if (!authStore.getUserId) {
      const tempUser = authStore.getPartialTempUser();
      try {
        const res = await authStore.login({
          email: emailVerification.email,
          password: tempUser?.password || "",
          rememberMe: true,
          profileType: UserType.USER,
        });
        authStore.clearPartialTempUser(); // remove the temp detail
        setTimeout(() => {
          toasterStore.showToaster({
            message: res?.data?.message || "Logged in successfully",
            type: "success",
          });
        }, 1000);
        localStorage.setItem("showIntroModal", JSON.stringify(true));
      } catch (error) {
        setTimeout(() => {
          toasterStore.showToaster({
            message:
              error?.data?.error ||
              "We couldn't log you in automatically, please manually log yourself in",
            type: "error",
          });
        }, 1000);
        localStorage.setItem("showIntroModal", JSON.stringify(true));
        return;
      }
    }

    const user = useCookie<User>("user");
    user.value = authStore.user;
    setTimeout(() => router.push("/"), 1000);
  } catch (error) {
    toasterStore.showToaster({
      message: error?.data?.error || "Something went wrong",
      type: "error",
    });
  }
};
const resendCode = async (email: string) => {
  if (canResend.value) {
    startTimer();
    try {
      const res = await authStore.resendVerification({ email });
      toasterStore.showToaster({
        message: res?.data?.message || "Code sent",
        type: "success",
      });
    } catch (error) {
      toasterStore.showToaster({
        message: error?.data?.error || "Something went wrong",
        type: "error",
      });
    }
  }
};
</script>
