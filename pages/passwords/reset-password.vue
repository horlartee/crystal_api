<template>
  <div class="flex w-full flex-col justify-center">
    <NuxtLink
      to="/passwords/forgot-password"
      class="h-[30px] w-[30px] rounded-full bg-slate-300 hover:bg-slate-400 flex
      items-center justify-center mb-4 transition-colors duration-300">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 11m0 0l7.5-7.5M3 11h18"></path>
      </svg>
    </NuxtLink>

    <div>
      <div>
        <h2 class="text-2xl 2xl:text-3xl">Enter OTP sent to your email</h2>
        <OTPCollector
          class="mt-5 mx-auto sm:mx-[unset]"
          @on-complete="form.otp = $event" />
      </div>

      <div class="border border-primary/30 my-10"></div>

      <h2 class="text-2xl 2xl:text-3xl">Enter new password</h2>
      <form @submit.prevent="reset" class="block overflow-y-auto px-1">
        <label for="password" class="relative flex items-center mt-[20px] 2xl:mt-10">
          <svg
            class="w-6 h-6 absolute left-3 text-primary"
            fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
          </svg>
          <input
            v-model="form.password"
            class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11
            placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
            :type="passwordVisibility.password ? 'text' : 'password'"
            name="password"
            required
            placeholder="Password">
          <svg
            @click="passwordVisibility.password = !passwordVisibility.password"
            class="w-6 h-6 absolute right-3"
            :class="passwordVisibility.password ? 'text-primary' : 'text-slate-300'"
            fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 11.322a1.011 1.011 0 010-.639C3.423 7.51 7.36 4.5 11 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 11 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </label>
        <PasswordStrength v-model="passwordStrength" :password="form.password" class="mt-1 px-2" />

        <label for="confirm-password" class="relative flex items-center mt-[20px] 2xl:mt-10">
          <svg
            class="w-6 h-6 absolute left-3 text-primary"
            fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
          </svg>
          <input
            v-model="form.confirmPassword"
            :class="[
              {'!border-red-500 focus:ring-red-500 !bg-red-500/20 border-opacity-100' : !passwordsMatch},
              {'!border-green-500 focus:!ring-green-500 !bg-green-500/20 border-opacity-100' : (passwordsMatch && form.confirmPassword)}
            ]"
            class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11
            placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
            :type="passwordVisibility.confirmPassword ? 'text' : 'password'"
            name="confirm-password"
            required
            placeholder="Confrm password">
          <svg
            @click="passwordVisibility.confirmPassword = !passwordVisibility.confirmPassword"
            class="w-6 h-6 absolute right-3"
            :class="passwordVisibility.confirmPassword ? 'text-primary' : 'text-slate-300'"
            fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 11.322a1.011 1.011 0 010-.639C3.423 7.51 7.36 4.5 11 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 11 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </label>

        <button
          class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px]
          mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl
          transition-colors duration-300"
          :disabled="requesting">
          <template v-if="!requesting">
            Save
          </template>
          <Loader class="mx-auto" v-else />
        </button>
      </form>
    </div>
    <Modal v-model="showModal" @update:model-value="redirect">
      <div class="flex flex-col items-center justify-center w-full gap-2 py-10">
        <img src="/images/night-calls.svg" alt="">
        <h3 class="font-semibold text-xl">Yay!!!</h3>
        <p>Password Reset Successful</p>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '@/stores/toaster'
import { useAuthStore } from '@/stores/auth'
import { UserType } from '@/types/auth'

definePageMeta({
  name: "reset-password",
  layout: 'auth',
})

const form = reactive({
  otp: "",
  password: "",
  confirmPassword: "",
})
const passwordVisibility = reactive({
  password: false,
  confirmPassword: false
})
const passwordsMatch = computed(() => {
  if(form.confirmPassword === "") {
    return true
  }
  return form.password === form.confirmPassword
})
const showModal = ref(false)

const toaster = useToasterStore()
const authStore = useAuthStore()
const requesting = computed(() => authStore.requesting)
const passwordStrength = ref(null)
const reset = async () => {
  const strength = passwordStrength.value
  if(strength){
    if(!strength?.ok){
      toaster.showToaster({ message: strength?.message || "Weak password", type: "error" })
      return
    }
  }
  if (form.password !== form.confirmPassword) {
    toaster.showToaster({ message: "Passwords don't match", type: "error" })
    return
  }
  if(form.otp === "") {
    toaster.showToaster({ message: "Invalid Token", type: "error" })
    return
  }

  try {
    const temp = authStore.getPartialTempUser()
    await authStore.resetPassword({
      password: form.password,
      code: form.otp,
      codeToken: authStore.getPartialTempUser()?.token || ""
    })
    showModal.value = true
    // log user in with new password
    try {
      const res = await authStore.login({
        email: temp.email,
        password: form.password,
        rememberMe: true,
        profileType: UserType.USER,
      })
      setTimeout(()=>{
        toaster.showToaster({
          message: res?.data?.message || "Logged in successfully with new password",
          type: "success"
        })
      }, 1000)
    } catch (error) {
      setTimeout(()=>{
        toaster.showToaster({
          message: error?.data?.error || "We couldn't log you in automatically, please manually log yourself in",
          type: "error"
        })
      },1000)
      setTimeout(()=>authStore.logout(), 5000)
    }
    authStore.clearPartialTempUser()
  } catch (error) {
    toaster.showToaster({ message: error?.data?.error || "Unable to reset your password at this time", type: "error" })
  }
}
const router = useRouter()
const redirect = (ev: boolean) => {
  if (ev) return
  router.push("/")
}
</script>