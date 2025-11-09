<template>
  <div class="w-full">
    <div class="flex flex-col items-center justify-center gap-3 mt-16 px-[10%]">
      <h3 class="text-2xl font-bold text-center text-primary">PAYMENT SUCCESSFUL</h3>
      <p class="text-center">You have successfully placed a new booking and it will be attended to as soon as possible</p>
      <img src="/images/night-calls.svg" class="w-60" alt="call illustration">
      <NuxtLink
        to="/"
        class="p-4 px-16 bg-primary hover:bg-orange-500 text-white rounded-lg
        transition-colors duration-300">
        Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'payment-success',
})
</script>