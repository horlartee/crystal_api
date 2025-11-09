<template>
  <div class="w-full space-y-5">
    <div class="animate-pulse relative h-10">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100
        rounded-md p-2 flex gap-10 justify-between">
        <div class="flex gap-6 flex-grow">
          <div class="w-1/5 bg-gray-50 rounded-lg"></div>
          <div class="w-1/3 bg-gray-100 rounded-lg"></div>
        </div>
        <div class="w-1/5 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    <div class="animate-pulse flex h-full flex-col justify-between gap-4">
      <div v-for="n in 4" :key="n" class="flex gap-4 h-6">
        <div class="rounded-md bg-gray-100 w-10"></div>
        <div class="flex-grow rounded-md bg-gray-50"></div>
      </div>
    </div>
  </div>
</template>