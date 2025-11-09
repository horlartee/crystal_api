<template>
  <div class="max-w-full">
    <NuxtLoadingIndicator />
    <div
      class="grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)_30px] max-w-full min-h-screen bg-black grid-rows-[1fr,1fr,minmax(0,calc(100vh-110px))] sm:grid-rows-[80px,minmax(0,calc(100vh-110px)),30px] place-content-start"
    >
      <div
        class="min-h-[40px] sm:h-auto sm:col-start-1 sm:col-span-2 relative overflow-y-hidden sm:overflow-y-visible"
      >
        <img
          src="/images/happy-sun.svg"
          class="absolute top-0 left-0 w-10 sm:w-[60px]"
          alt="happy sun"
        />
        <div class="h-full flex justify-end items-center pr-[30px]">
          <AdminLabel v-if="profileType === UserType.ADMIN" />
        </div>
      </div>

      <div
        class="sm:col-start-1 sm:row-start-2 text-white px-6 bg-white sm:bg-transparent"
      >
        <div class="mx-auto flex items-center sm:block">
          <img
            src="/images/logo.svg"
            class="my-2 sm:my-0 sm:mb-[68px] h-8 sm:h-auto sm:py-0 invert sm:invert-0"
            alt="logo"
          />
          <!-- add mobile logo -->
          <div class="flex-grow sm:hidden flex justify-end text-primary">
            <svg
              @click="showMobMenu = !showMobMenu"
              class="w-10 h-10"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </div>
          <div
            ref="menuRef"
            :class="[showMobMenu ? 'top-[0%]' : '-top-[100%]']"
            class="fixed sm:static inset-x-0 sm:block p-6 sm:p-0 pb-4 sm:pb-0 bg-black z-50 transition-all duration-300"
          >
            <NuxtLink
              class="text-xl capitalize flex gap-3 items-center text-primary"
              :to="'/'"
            >
              <svg
                class="w-5"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7213 10.4251C13.3369 10.0591 12.8263 9.85531 12.2955 9.85617C11.7648 9.85704 11.2548 10.0625 10.8716 10.4298L9.60311 11.499C8.56766 11.0702 7.62709 10.441 6.83539 9.6475C6.0437 8.85403 5.41648 7.91194 4.98975 6.87531L6.05458 5.61038C6.42147 5.22696 6.62659 4.71689 6.62734 4.18612C6.62808 3.65536 6.42438 3.14471 6.05857 2.76027C6.05857 2.76027 4.8267 1.16046 4.80607 1.13982C4.42641 0.757148 3.91142 0.539391 3.3725 0.53366C2.83358 0.527928 2.31407 0.734684 1.92637 1.10919L1.16103 1.77495C-3.97677 7.23948 9.28034 20.508 14.7376 15.2898L15.3445 14.5908C15.7298 14.2039 15.9461 13.6801 15.9461 13.1341C15.9461 12.588 15.7298 12.0642 15.3445 11.6774C15.3232 11.6581 13.7213 10.4251 13.7213 10.4251ZM14.9911 8.90521C18.3127 4.01456 12.4622 -1.82879 7.57861 1.49134C7.43388 1.59243 7.33521 1.74689 7.30432 1.92075C7.27343 2.0946 7.31285 2.27362 7.4139 2.41841C7.51495 2.56319 7.66935 2.66189 7.84315 2.69279C8.01694 2.7237 8.19589 2.68427 8.34063 2.58318C11.9823 0.0812662 16.4 4.50256 13.8997 8.14358C13.8476 8.21518 13.8102 8.29646 13.7899 8.38266C13.7696 8.46887 13.7667 8.55826 13.7813 8.64561C13.7959 8.73297 13.8279 8.81652 13.8752 8.89138C13.9225 8.96623 13.9843 9.03089 14.0569 9.08157C14.1295 9.13224 14.2115 9.16791 14.2981 9.18648C14.3847 9.20506 14.4741 9.20617 14.5611 9.18974C14.6481 9.17332 14.7309 9.13969 14.8048 9.09083C14.8786 9.04198 14.942 8.97887 14.9911 8.90521ZM12.4236 7.66357C12.5483 7.53872 12.6184 7.36942 12.6184 7.19288C12.6184 7.01635 12.5483 6.84704 12.4236 6.72219L11.2875 5.58574V3.8621C11.2875 3.68553 11.2174 3.51619 11.0926 3.39134C10.9678 3.26648 10.7985 3.19634 10.622 3.19634C10.4455 3.19634 10.2762 3.26648 10.1514 3.39134C10.0266 3.51619 9.9565 3.68553 9.9565 3.8621V5.85937C9.95654 6.03592 10.0267 6.20524 10.1515 6.33006L11.4825 7.66157C11.6073 7.78638 11.7766 7.8565 11.9531 7.8565C12.1295 7.8565 12.2988 7.78638 12.4236 7.66157V7.66357Z"
                  fill="currentColor"
                />
              </svg>
              bookings
            </NuxtLink>
            <button
              @click="showLogoutModal = true"
              class="text-xl capitalize flex gap-3 items-center mt-6"
            >
              <svg
                class="w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div class="sm:col-start-2 col-span-1 sm:row-start-2 sm:row-span-1">
        <div class="w-full h-full bg-white sm:rounded-xl overflow-y-auto">
          <NuxtPage />
        </div>
      </div>
    </div>
    <Toaster />
    <Modal v-model="showLogoutModal">
      <div
        class="flex flex-col items-center justify-center w-full gap-2 py-10 px-10"
      >
        <h3 class="text-xl font-bold">Log out?</h3>
        <p class="text-slate-500 max-w-sm text-center">
          Are you sure you want to logout from your Happivibe account??
        </p>
        <button
          @click="authStore.logout()"
          class="p-2 px-4 bg-primary hover:bg-orange-500 text-white rounded-lg transition-colors duration-300 mt-6"
        >
          Logout
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { UserType } from "@/types/auth";
import {  ref } from "vue";

const timer = ref(20 * 60 * 1000);

// onMounted(() => {
//   const events = ["click", "mousedown", "keydown", "change"];
//   const authStore = useAuthStore();
//   let logoutTimeout = setTimeout(logUserOut, timer.value);
//   events.forEach((event) => {
//     window.addEventListener(event, handleEvent);
//     console.log(event);
//   });

//   function logUserOut() {
//     authStore.logout();
//   }
//   function handleEvent() {
//     clearTimeout(logoutTimeout);
//     // console.log("event", timer.value);
//     logoutTimeout = setTimeout(logUserOut, timer.value);
//   }
// });

const profileType = computed(() => authStore.getProfileType);
const active_nav = ref("home");
const menu = [
  {
    name: "bookings",
    slug: "/",
  },
];

const authStore = useAuthStore();
if (!authStore.isLoggedIn) {
  authStore.hydrateUser();
}
const showLogoutModal = ref(false);
const showMobMenu = ref(false);
const menuRef = ref(null);
onClickOutside(menuRef, (event) => (showMobMenu.value = false));

// use render function to create admin label
const AdminLabel = function () {
  return h(
    "span",
    {
      class:
        "text-xs font-semibold bg-white text-black rounded-full px-2 py-1 select-none",
    },
    "Admin"
  );
};
</script>