<template>
  <div class="flex w-full flex-col justify-center">
    <h2 class="text-3xl 2xl:text-[48px]">Welcome Back</h2>

    <form @submit.prevent="login" class="block sm:overflow-y-auto px-1">
      <label for="email" class="relative flex items-center mt-[20px] 2xl:mt-10">
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
      <label for="password" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-primary hidden sm:block"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
        </svg>
        <input
          v-model="form.password"
          class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11
          placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
          :type="passwordVisibility ? 'text' : 'password'"
          name="password"
          required
          placeholder="Password">
        <svg
          @click="passwordVisibility = !passwordVisibility"
          class="w-6 h-6 absolute right-3"
          :class="passwordVisibility ? 'text-primary' : 'text-slate-300'"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 11.322a1.011 1.011 0 010-.639C3.423 7.51 7.36 4.5 11 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 11 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </label>

      <button
        class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px]
        mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl
        transition-colors duration-300"
        type="submit"
        :disabled="logingIn">
        <template v-if="!logingIn">
          Login
        </template>
        <Loader class="mx-auto" v-else />
      </button>

      <div class="flex justify-between mt-[20px]">
        <div class="flex items-center">
            <input v-model="form.remember" id="checked-checkbox" type="checkbox" value=""
              class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-slate-600">Remember me</label>
        </div>

        <NuxtLink to="passwords/forgot-password" class="ml-auto text-sm font-medium text-primary">Forgot password?</NuxtLink>
      </div>
    </form>

    <div class="text-slate-500 mt-[20px] text-xl 2xl:text-2xl">
      <!-- <p>or continue with</p>
      <div class="flex gap-4 mt-[20px]">
        <button
          class="w-[50px] h-[50px] rounded-full border-2 border-black border-opacity-5
          flex items-center justify-center">
          <img src="/images/google-g-icon.png">
        </button>
        <button
          class="w-[50px] h-[50px] rounded-full border-2 border-black border-opacity-5
          flex items-center justify-center">
          <svg class="text-blue-800" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
          <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
          </svg>
        </button>
        <button
          class="w-[50px] h-[50px] rounded-full border-2 border-black border-opacity-5
          flex items-center justify-center">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
          <path d="M24.734 17.003c-0.040-4.053 3.305-5.996 3.454-6.093-1.88-2.751-4.808-3.117-5.851-3.171-2.492-0.252-4.862 1.467-6.117 1.467-1.261 0-3.213-1.43-5.28-1.392-2.716 0.040-5.221 1.579-6.619 4.011-2.822 4.897-0.723 11.151 2.028 16.113 1.344 1.944 2.947 4.117 5.051 4.049 2.026-0.081 2.793-1.311 5.242-1.311s3.138 1.311 5.283 1.271c2.18-0.041 3.562-1.981 4.897-3.931 1.543-2.255 2.179-4.439 2.216-4.551-0.048-0.022-4.252-1.632-4.294-6.473zM20.705 5.11c1.117-1.355 1.871-3.235 1.665-5.11-1.609 0.066-3.559 1.072-4.713 2.423-1.036 1.199-1.942 3.113-1.699 4.951 1.796 0.14 3.629-0.913 4.747-2.264z"></path>
          </svg>
        </button>
      </div> -->
      <p class="2xl:mt-10">
        Don't have an account? <a href="/signup" class="text-primary">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useToasterStore } from '@/stores/toaster'
import { UserType } from "@/types/auth"

definePageMeta({
  name: "login",
  layout: 'auth',
  middleware: ['auth'],
})

const form = reactive({
  email: "",
  password: "",
  remember: false,
})
const passwordVisibility = ref(false)
const authStore = useAuthStore()
const logingIn = computed(() => authStore.requesting)
const toasterStore = useToasterStore()
const router = useRouter()
const login = async () => {
  try {
    const data = await authStore.login({
      email: form.email,
      password: form.password,
      rememberMe: form.remember,
      profileType: UserType.USER
    })
    toasterStore.showToaster({
      message: "Login successful",
      type: "success",
    })
    setTimeout(()=>router.push('/'), 1000)
  } catch (error) {
    toasterStore.showToaster({
      message: error?.data?.error || "Something went wrong",
      type: "error",
    })

    // if users email is not verified
    if(error?.statusCode === 417) {
      authStore.savePartialTempUser({ email: form.email, password: form.password})
      nextTick(()=>router.push('/email-verification'))
    }
  }
}
</script>
