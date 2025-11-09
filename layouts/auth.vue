<template>
  <div class="flex flex-col sm:flex-row h-screen bg-black">
    <NuxtLoadingIndicator />
    <div class="sm:w-1/2 md:w-2/5 text-white pt-[2%] 2xl:pt-[5%] relative overflow-hidden">
      <img src="/images/happy-sun.svg" class="absolute top-0 left-0 w-[100px]" alt="happy sun">
      <img src="/images/building-background.svg" class="absolute -bottom-[40px] scale-105 hidden sm:block" alt="background illustration">
      <div class="mx-auto max-w-md mb-[20px] 2xl:mb-[40px]">
        <img src="/images/logo.svg" class="mx-auto py-10 sm:py-0" alt="logo">
      </div>
      <div class="hidden sm:flex flex-col gap-4 mx-auto max-w-md px-[20px] 2xl:px-0 relative z-10 bg-black/90 rounded-xl sm:py-4">
        <h1 class="text-[50px] 2xl:text-[60px] leading-none 2xl:leading-[66px] font-semibold">
          Board the Uber of Happiness
        </h1>
        <p>Amidst a world continuously in chaos and turmoil, we believe nonetheless that every human being should be happy. We believe every face deserves to smile and every heart deserves to be filled with joy.</p>
        <p>So hop aboard, let's drive to destination Happiness 🤗✨</p>
        <div class="[&>*]:h-[10px] [&>*]:bg-white [&>*]:rounded-full flex gap-3">
          <div class="w-[80px] !bg-primary"></div>
          <div class="w-[40px]"></div>
          <div class="w-[20px]"></div>
        </div>
      </div>
    </div>

    <div class="sm:w-1/2 md:w-3/5 overflow-y-auto h-full rounded-3xl rounded-b-none sm:rounded-none bg-white">
      <div class="sm:max-w-xl sm:min-h-screen flex px-4 p-10 sm:pl-20">
        <slot></slot>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { UserType } from '@/types/auth';

const authStore = useAuthStore()
if(!authStore.isLoggedIn) {
  authStore.hydrateUser()
}

// this is currenlty used to know where to redirect user
// when they click on back button on /passwords/fprgot-password
const profileType = useCookie('tempProfileType')
onMounted(()=>profileType.value = UserType.USER)
</script>