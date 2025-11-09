<template>
  <div class="flex flex-col sm:flex-row h-screen">
    <NuxtLoadingIndicator />
    <div class="sm:w-1/2 md:w-2/5 text-black pt-[2%] 2xl:pt-[5%] relative overflow-hidden">
      <img src="/images/happy-sun-admin.svg" class="absolute top-0 left-0 w-[100px]" alt="happy sun">
      <img src="/images/building-background-admin.svg" class="absolute -bottom-[40px] scale-105 hidden sm:block" alt="background illustration">
      <div class="mx-auto max-w-md mb-[20px] 2xl:mb-[40px] h-[80px]">
      </div>
      <div class="hidden sm:flex flex-col gap-4 mx-auto max-w-md px-[20px] 2xl:px-0">
        <h1 class="text-[50px] 2xl:text-[60px] leading-none 2xl:leading-[66px] font-semibold">
          Board the Uber of Happiness
        </h1>
        <div class="[&>*]:h-[10px] [&>*]:bg-gray-300 [&>*]:rounded-full flex gap-3 mt-6">
          <div class="w-[80px] !bg-black"></div>
          <div class="w-[40px]"></div>
          <div class="w-[20px]"></div>
        </div>
      </div>
    </div>

    <div class="sm:w-1/2 md:w-3/5 overflow-y-auto h-full rounded-3xl rounded-b-none sm:rounded-none bg-primary-faded">
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

const profileType = useCookie('tempProfileType')
onMounted(()=>profileType.value = UserType.ADMIN)
</script>