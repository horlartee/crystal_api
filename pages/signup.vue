<template>
  <div class="flex w-full flex-col justify-center">
    <h2 class="text-3xl 2xl:text-[48px]">Create an account</h2>

    <form @submit.prevent="submit" class="block overflow-y-auto px-1">
      <label for="name" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-primary"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
        </svg>
        <input
          v-model="form.fullName"
          class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11
          placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
          type="text"
          name="name"
          required
          placeholder="Full name">
      </label>
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
      <label for="phone" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-primary"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
        </svg>
        <input
          v-model="form.phoneNumber"
          class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px]
          placeholder-opacity-50 outline-none pl-11
          focus:border-opacity-0 focus:ring-2 focus:ring-primary"
          type="text"
          name="phone"
          required
          placeholder="Phone number">
      </label>
      <label for="gender" class="relative flex items-center mt-[20px] 2xl:mt-10">
        <svg
          class="w-6 h-6 absolute left-3 text-primary"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
          <path d="M 56.831 0 v 6 h 10.573 L 53.909 19.496 c -4.395 -3.644 -10.034 -5.839 -16.176 -5.839 c -13.994 0 -25.379 11.385 -25.379 25.379 c 0 12.979 9.795 23.706 22.379 25.196 v 9.621 H 24.284 v 6 h 10.448 V 90 h 6 V 79.854 h 10.449 v -6 H 40.733 v -9.621 c 12.585 -1.49 22.38 -12.217 22.38 -25.196 c 0 -5.694 -1.886 -10.956 -5.065 -15.196 l 13.599 -13.599 v 10.574 h 6 V 0 H 56.831 z M 37.733 58.416 c -10.686 0 -19.379 -8.693 -19.379 -19.379 s 8.693 -19.379 19.379 -19.379 c 10.687 0 19.38 8.693 19.38 19.379 S 48.419 58.416 37.733 58.416 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        </g>
        </svg>
        <select
          v-model="form.gender"
          class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px]
          placeholder-opacity-50 outline-none pl-11
          focus:border-opacity-0 focus:ring-2 focus:ring-primary"
          name="gender"
          required>
          <option value="" selected>Select Gender</option>
          <option v-for="gender in Object.values(Gender)" :key="gender" :value="gender">
            {{ gender }}
          </option>
        </select>
      </label>
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
          :type="passwordVisibility ? 'text' : 'password'"
          name="password"
          required
          placeholder="Password">
        <svg
          @click="passwordVisibility = !passwordVisibility"
          class="w-6 h-6 absolute right-3"
          :class="passwordVisibility ? 'text-primary' : 'text-slate-300'"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </label>
      <PasswordStrength v-model="passwordStrength" :password="form.password" class="mt-1 px-2" />

      <button
        class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px]
        mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl disabled:opacity-50
        transition-colors duration-300"
        type="submit"
        :disabled="signingUp">
        <template v-if="!signingUp">
          Sign up
        </template>
        <Loader class="mx-auto" v-else />
      </button>
    </form>

    <div class="text-slate-500 my-[20px] text-xl 2xl:text-2xl">
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
        Already have an account? <NuxtLink to="/login" class="text-primary font-bold">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { SignupData, Title, Gender, MaritalStatus, UserType } from '@/types/auth'
import { useToasterStore } from '@/stores/toaster'

const authStore = useAuthStore()
definePageMeta({
  name: "signup",
  layout: 'auth',
  middleware: ['auth'],
})

const form = reactive<SignupData>({
  fullName: "",
  email: "",
  phoneNumber: "",
  gender: "" as Gender,
  password: "",

  // defaults
  title: Title.NA,
  maritalStatus: MaritalStatus.NA,
  type: UserType.USER,
  location: 'N/A',
  username: '',
  dob: new Date().toISOString().split('T')[0],
  imageUrl: 'N/A',
})

const errors = reactive({
  fullName: false,
  email: false,
  phoneNumber: false,
  password: false,
})
// const validate = (item: any) => {
// // validate name using regexp
//   if (item === 'fullName') {
//     const nameRegex = /^[a-zA-Z ]{2,30}$/
//     errors.fullName = nameRegex.test(form.fullName)
//   }

//   // validate email using regexp
//   if (item === 'email') {
//     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
//     errors.email = emailRegex.test(form.email)
//   }

//   // validate phone number using regexp
//   if (item === 'phoneNumber') {
//     const phoneRegex = /^[0-9]{11}$/
//     errors.phoneNumber = phoneRegex.test(form.phoneNumber)
//   }

//   // validate password using regexp
//   if (item === 'password') {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
//     errors.password = passwordRegex.test(form.password)
//   }

//   return !errors.fullName && !errors.email && !errors.phoneNumber && !errors.password
// }
const passwordVisibility = ref(false)
const signingUp = computed(() => authStore.requesting)
const toasterStore = useToasterStore()
const router = useRouter()
const passwordStrength = ref(null)
const submit = async () => {
  const strength = passwordStrength.value
  if(strength){
    if(!strength?.ok){
      toasterStore.showToaster({ message: strength?.message || "Weak password", type: "error" })
      return
    }
  }

  try {
    const data = await authStore.signup(form)
    toasterStore.showToaster({
      message: "Signup successful, please check your email to verify your account",
      type: "success",
    })

    // clear form
    form.fullName = ""
    form.email = ""
    form.phoneNumber = ""
    form.gender = "" as Gender
    form.password = ""

    setTimeout(() => {
      router.push('/email-verification')
    }, 3000);
  } catch (error) {
    toasterStore.showToaster({
      message: error?.data?.error || "Signup failed",
      type: "error",
    })
  }
}
</script>
