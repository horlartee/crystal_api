<template>
  <div class="flex w-full flex-col justify-center">
    <h2 class="text-3xl 2xl:text-[48px]">Welcome Back Happiviber</h2>

    <form @submit.prevent="login" class="block sm:overflow-y-auto px-1">
      <label for="email" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-white"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
        </svg>
        <input
          v-model="form.email"
          class="w-full border-2 border-white rounded-2xl px-[18px] py-[14px]
          outline-none pl-11 bg-transparent placeholder:text-white autofill:!bg-transparent
          focus:border-opacity-0 focus:ring-2 focus:ring-black"
          type="email"
          name="email"
          required
          placeholder="Email address">
      </label>
      <label for="password" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-white hidden sm:block"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
        </svg>
        <input
          v-model="form.password"
          class="w-full border-2 border-white rounded-2xl px-[18px] py-[14px]
          outline-none pl-11 bg-transparent placeholder:text-white autofill:!bg-transparent
          focus:border-opacity-0 focus:ring-2 focus:ring-black"
          :type="passwordVisibility ? 'text' : 'password'"
          name="password"
          required
          placeholder="Password">
        <svg
          @click="passwordVisibility = !passwordVisibility"
          class="w-6 h-6 absolute right-3"
          :class="passwordVisibility ? 'text-black' : 'text-white/50'"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 11.322a1.011 1.011 0 010-.639C3.423 7.51 7.36 4.5 11 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 11 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </label>

      <button
        class="w-full bg-white hover:bg-white/90 text-black rounded-2xl px-[18px] py-[14px]
        mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl
        transition-colors duration-300"
        type="submit"
        :disabled="logingIn">
        <template v-if="!logingIn">
          Login
        </template>
        <Loader class="mx-auto [&>*]:!bg-black" v-else />
      </button>

      <div class="flex justify-between mt-[20px]">
        <div class="flex items-center">
            <input v-model="form.remember" id="checked-checkbox" type="checkbox" value=""
              class="w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2">
            <label for="checked-checkbox" class="ml-2 text-sm font-medium text-slate-600">Remember me</label>
        </div>

        <NuxtLink to="/passwords/forgot-password" class="ml-auto text-sm font-medium text-white">Forgot password?</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useToasterStore } from '@/stores/toaster'
import { UserType } from "@/types/auth"

definePageMeta({
  name: "admin-login",
  layout: 'admin-auth',
  // middleware: ['auth'],
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
      profileType: UserType.ADMIN,
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
    console.log({ error })
  }
}
</script>
