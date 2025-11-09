<template>
  <div class="min-h-screen bg-black flex flex-col">
    <NuxtLoadingIndicator />
    <img
      src="/images/happy-sun.svg"
      class="absolute top-0 left-0 w-[60px]"
      alt="happy sun"
    />
    <div
      class="text-white w-full flex items-center justify-center sm:justify-start h-[80px] px-10 max-w-6xl mx-auto"
    >
      <img src="/images/logo.svg" alt="logo" />
    </div>
    <div class="flex bg-white flex-grow">
      <div class="w-full px-4 sm:px-10 max-w-6xl mx-auto flex">
        <NuxtPage />
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
// import autoLogout from "@/composables/autoLogout.ts";

// autoLogout(5000);

const authStore = useAuthStore();
if (!authStore.isLoggedIn) {
  authStore.hydrateUser();
}
</script>