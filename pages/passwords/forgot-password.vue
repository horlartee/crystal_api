<template>
  <div class="flex w-full flex-col justify-center">
    <button
      @click="back"
      class="h-[30px] w-[30px] rounded-full bg-slate-300 hover:bg-slate-400 flex
      items-center justify-center mb-4 transition-colors duration-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 11m0 0l7.5-7.5M3 11h18"></path>
      </svg>
    </button>

    <h2 class="text-3xl 2xl:text-[48px]">Forgot Password?</h2>
    <p class="text-lg 2xl:text-xl mt-[20px] 2xl:mt-[40px]">
      Don't worry about that, just fill in your email address and we will get your password back.
    </p>

    <form @submit.prevent="sendCode" class="block overflow-y-auto px-1">
      <label for="email" class="relative flex items-center mt-[20px] 2xl:mt-10 ">
        <svg
          class="w-6 h-6 absolute left-3 text-primary"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
        </svg>
        <input
          v-model="form.email"
          class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px]
          placeholder-opacity-50 outline-none pl-11
          focus:border-opacity-0 focus:ring-2 focus:ring-primary"
          type="email"
          name="email"
          required
          placeholder="Email address">
      </label>

      <button
        class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px]
        mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl
        transition-colors duration-300"
        type="submit"
        :disabled="sending">
        <template v-if="!sending">
          Send Code
        </template>
        <Loader class="mx-auto" v-else />

      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useToasterStore } from '@/stores/toaster'
import { UserType } from '@/types/auth'
const toasterStore = useToasterStore()

definePageMeta({
  name: "forgot-password",
  layout: "auth",
})

const form = reactive({
  email: "",
})

const authStore = useAuthStore()
const sending = computed(() => authStore.requesting)
const sendCode = async () => {
  // make request
  try {
    const token = await authStore.forgotPassword({ email: form.email })
    toasterStore.showToaster({
      message: "Code sent to your email",
      type: "success",
    })
    authStore.savePartialTempUser({ email: form.email, token })
    form.email = ""
    nextTick(() => router.push('/passwords/reset-password'))
  } catch (error) {
    toasterStore.showToaster({
      message: error?.data?.error?.error || "Something went wrong",
      type: "error"
    })
  }
}
const profileType = useCookie('tempProfileType')
const router = useRouter()
const back = () =>router.push(profileType.value === UserType.ADMIN ? '/admin/login' : '/login')
</script>