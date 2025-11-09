<template>
  <div>
    <div
      id="stage-nav"
      class="flex overflow-x-auto whitespace-nowrap items-center gap-4"
    >
      <NuxtLink to="/">
        <svg
          class="w-10 text-primary hover:text-orange-500"
          fill="currentColor"
          stroke="white"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </NuxtLink>
      <ul class="flex gap-5 text-lg font-semibold">
        <li
          @click="switchStage(i + 1)"
          class="sm:border-b-2 select-none cursor-pointer capitalize px-2 sm:px-0 rounded-lg sm:rounded-none"
          :class="[
            item.stage === activeStage
              ? 'bg-primary sm:bg-transparent !text-black sm:!text-primary sm:border-primary'
              : 'border-transparent',
            item.stage <= maxProgress ? 'text-primary' : 'sm:text-slate-400',
          ]"
          v-for="(item, i) in stageList"
          :key="i"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <div v-show="activeStage === 1">
        <h2 class="font-semibold">Confirm their details</h2>
        <form
          @submit.prevent="moveToNextStage(2)"
          class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 overflow-y-auto"
        >
          <div class="px-1 pb-1">
            <label
              for="name"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                ></path>
              </svg>
              <input
                v-model="stageOne.fullName"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11 placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="name"
                required
                placeholder="His/Her Full name"
              />
            </label>
            <label
              for="phone"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                ></path>
              </svg>
              <input
                v-model="stageOne.phoneNumber"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="phone"
                required
                placeholder="Their Phone number"
              />
              <span class="absolute text-xs right-0 top-full"
                >Preferably their Whatsapp Number</span
              >
            </label>
            <label
              for="gender"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                xml:space="preserve"
              >
                <g
                  style="
                    stroke: none;
                    stroke-width: 0;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: none;
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 56.831 0 v 6 h 10.573 L 53.909 19.496 c -4.395 -3.644 -10.034 -5.839 -16.176 -5.839 c -13.994 0 -25.379 11.385 -25.379 25.379 c 0 12.979 9.795 23.706 22.379 25.196 v 9.621 H 24.284 v 6 h 10.448 V 90 h 6 V 79.854 h 10.449 v -6 H 40.733 v -9.621 c 12.585 -1.49 22.38 -12.217 22.38 -25.196 c 0 -5.694 -1.886 -10.956 -5.065 -15.196 l 13.599 -13.599 v 10.574 h 6 V 0 H 56.831 z M 37.733 58.416 c -10.686 0 -19.379 -8.693 -19.379 -19.379 s 8.693 -19.379 19.379 -19.379 c 10.687 0 19.38 8.693 19.38 19.379 S 48.419 58.416 37.733 58.416 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: currentColor;
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                </g>
              </svg>
              <select
                v-model="stageOne.gender"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="gender"
                required
              >
                <option value="" selected>Select their Gender</option>
                <option
                  v-for="gender in Object.values(Gender)"
                  :key="gender"
                  :value="gender"
                >
                  {{ gender }}
                </option>
              </select>
            </label>
            <label
              for="location"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                ></path>
              </svg>
              <input
                v-model="stageOne.location"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="location"
                ref="location"
                required
                placeholder="Their Location"
              />
            </label>
            <label
              for="marital-status"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0257 8C14.8955 8.00096 13.7784 8.24218 12.7484 8.70767C11.7185 9.17316 10.7993 9.85228 10.0517 10.7C9.57524 10.4684 9.07358 10.2925 8.55674 10.176L9.92574 7.447C10.0017 7.29485 10.0377 7.12583 10.0301 6.95593C10.0226 6.78602 9.97189 6.62084 9.88274 6.476C9.56529 6.01333 9.13828 5.63642 8.63977 5.37888C8.14127 5.12134 7.58677 4.99118 7.02574 5C6.46555 4.99201 5.91207 5.12257 5.4145 5.38007C4.91694 5.63758 4.49072 6.01404 4.17374 6.476C4.08459 6.62084 4.03386 6.78602 4.02634 6.95593C4.01881 7.12583 4.05475 7.29485 4.13074 7.447L5.49474 10.174C4.46571 10.4006 3.50111 10.8565 2.67286 11.5079C1.84462 12.1592 1.1741 12.9892 0.711311 13.9358C0.248523 14.8824 0.00540623 15.9213 8.91384e-05 16.9749C-0.00522795 18.0286 0.227392 19.0699 0.680603 20.0211C1.13381 20.9723 1.79592 21.809 2.61755 22.4686C3.43918 23.1283 4.39913 23.594 5.42583 23.8309C6.45252 24.0679 7.51946 24.07 8.54708 23.8371C9.5747 23.6043 10.5365 23.1424 11.3607 22.486C12.3841 23.2249 13.5678 23.7112 14.8151 23.9051C16.0623 24.0989 17.3378 23.9949 18.5372 23.6015C19.7365 23.2081 20.8258 22.5365 21.716 21.6416C22.6061 20.7466 23.2718 19.6537 23.6587 18.4522C24.0457 17.2508 24.1428 15.9748 23.9422 14.7286C23.7416 13.4824 23.2489 12.3013 22.5045 11.2819C21.7601 10.2626 20.785 9.43381 19.659 8.86341C18.533 8.29301 17.288 7.99714 16.0257 8ZM11.2597 19.63C10.5957 18.7672 10.1813 17.7386 10.0617 16.6564C9.94217 15.5742 10.122 14.48 10.5817 13.493C11.3741 14.2874 11.8728 15.3275 11.996 16.4427C12.1192 17.5579 11.8596 18.6818 11.2597 19.63ZM2.02574 17C2.02363 16.1803 2.2236 15.3727 2.60797 14.6487C2.99233 13.9247 3.54923 13.3066 4.22938 12.8491C4.90954 12.3917 5.69198 12.1089 6.50746 12.0258C7.32294 11.9428 8.14632 12.062 8.90474 12.373C8.19118 13.7623 7.90229 15.331 8.07407 16.8834C8.24585 18.4358 8.8707 19.9033 9.87074 21.103C9.12193 21.6254 8.24414 21.9323 7.33297 21.9904C6.4218 22.0484 5.51216 21.8553 4.70312 21.4322C3.89407 21.0091 3.21662 20.3721 2.74454 19.5906C2.27245 18.8091 2.02383 17.913 2.02574 17ZM16.0257 22C14.8607 22.0004 13.7211 21.6593 12.7477 21.019C13.7323 19.6273 14.1721 17.9227 13.9837 16.2283C13.7954 14.5339 12.992 12.9675 11.7257 11.826C12.4153 11.114 13.2705 10.5838 14.215 10.283C15.1594 9.98218 16.1637 9.92003 17.1381 10.1021C18.1124 10.2842 19.0265 10.7048 19.7985 11.3264C20.5706 11.948 21.1767 12.7512 21.5626 13.6642C21.9485 14.5772 22.1021 15.5716 22.0099 16.5585C21.9176 17.5454 21.5823 18.4941 21.0339 19.3198C20.4854 20.1454 19.741 20.8224 18.8671 21.2901C17.9931 21.7578 17.017 22.0017 16.0257 22ZM10.1307 3.553L11.1307 1.553C11.2493 1.31563 11.4573 1.13508 11.709 1.05106C11.8336 1.00946 11.9652 0.992814 12.0962 1.00207C12.2273 1.01132 12.3552 1.0463 12.4727 1.105C12.5903 1.1637 12.6951 1.24498 12.7812 1.34419C12.8673 1.4434 12.9331 1.5586 12.9747 1.68322C13.0163 1.80783 13.0329 1.93942 13.0237 2.07047C13.0144 2.20152 12.9794 2.32947 12.9207 2.447L11.9207 4.447C11.862 4.56453 11.7808 4.66935 11.6816 4.75548C11.5823 4.8416 11.4671 4.90734 11.3425 4.94894C11.2179 4.99054 11.0863 5.00719 10.9553 4.99793C10.8242 4.98868 10.6963 4.9537 10.5787 4.895C10.3414 4.77645 10.1608 4.56846 10.0768 4.31678C9.99279 4.06511 10.0122 3.79037 10.1307 3.553ZM1.13074 2.447C1.01219 2.20897 0.993052 1.93359 1.07754 1.68145C1.16202 1.42931 1.34321 1.22105 1.58124 1.1025C1.81927 0.983948 2.09465 0.96481 2.34679 1.0493C2.59894 1.13378 2.80719 1.31497 2.92574 1.553L3.92574 3.553C3.98444 3.67053 4.01942 3.79848 4.02867 3.92953C4.03793 4.06058 4.02128 4.19217 3.97968 4.31678C3.93808 4.4414 3.87234 4.5566 3.78622 4.65581C3.7001 4.75502 3.59527 4.8363 3.47774 4.895C3.36021 4.9537 3.23226 4.98868 3.10121 4.99793C2.97016 5.00719 2.83857 4.99054 2.71396 4.94894C2.46228 4.86492 2.25429 4.68437 2.13574 4.447L1.13074 2.447ZM6.02574 3V1C6.02574 0.734784 6.1311 0.48043 6.31863 0.292893C6.50617 0.105357 6.76053 0 7.02574 0C7.29096 0 7.54531 0.105357 7.73285 0.292893C7.92038 0.48043 8.02574 0.734784 8.02574 1V3C8.02574 3.26522 7.92038 3.51957 7.73285 3.70711C7.54531 3.89464 7.29096 4 7.02574 4C6.76053 4 6.50617 3.89464 6.31863 3.70711C6.1311 3.51957 6.02574 3.26522 6.02574 3Z"
                  fill="currentColor"
                />
              </svg>
              <select
                v-model="stageOne.maritalStatus"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="marital-status"
                required
              >
                <option value="" selected>Select their marital status</option>
                <option
                  v-for="status in Object.values(MaritalStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
            </label>
          </div>
          <div class="px-1 py-1 row-start-3 sm:col-span-2 sm:row-start-2">
            <label for="terms" class="flex items-center mt-4">
              <input
                v-model="stageOne.terms"
                type="checkbox"
                class="w-5 h-5 border-2 border-black border-opacity-10 rounded-2xl mr-2"
                name="terms"
                required
              />
              <span class="text-sm text-black text-opacity-50">
                I agree to the
                <button
                  @click="showTAndCModal = true"
                  class="font-bold text-black hover:underline"
                >
                  Terms and Conditions
                </button>
              </span>
            </label>
          </div>
          <div class="px-1 pb-1">
            <label
              for="salutation"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.479 10.2922C11.2442 10.2922 11.0146 10.2225 10.8193 10.092C10.624 9.96156 10.4718 9.7761 10.3819 9.55911C10.292 9.34213 10.2685 9.10336 10.3143 8.87301C10.3602 8.64265 10.4733 8.43106 10.6393 8.26499C10.8054 8.09891 11.017 7.98581 11.2473 7.93999C11.4777 7.89417 11.7165 7.91769 11.9335 8.00757C12.1504 8.09745 12.3359 8.24965 12.4664 8.44494C12.5969 8.64022 12.6665 8.86981 12.6665 9.10468C12.6665 9.41962 12.5414 9.72167 12.3187 9.94437C12.096 10.1671 11.794 10.2922 11.479 10.2922ZM17.3271 6.38689C16.9616 4.58174 15.982 2.95895 14.555 1.79461C13.128 0.630264 11.3416 -0.00372118 9.49985 0.000509317C4.00014 0.000509317 2.37485 3.62793 1.40981 5.79472C1.21489 6.33044 0.938228 6.83276 0.589641 7.28384C0.367974 7.41007 0.192843 7.60431 0.0901757 7.83783C-0.0124914 8.07134 -0.0372371 8.3317 0.0196023 8.58038C0.0764417 8.82905 0.211845 9.05281 0.405765 9.21853C0.599686 9.38425 0.841816 9.48312 1.09631 9.50051C2.90472 9.57291 4.71003 9.29412 6.41235 8.67955C6.32789 8.8983 6.31009 9.13716 6.36118 9.36602C6.41228 9.59487 6.52998 9.80347 6.69946 9.96553C6.86894 10.1276 7.0826 10.2358 7.31351 10.2766C7.54443 10.3174 7.78225 10.289 7.997 10.1948C8.21175 10.1007 8.39382 9.94502 8.52025 9.74754C8.64668 9.55005 8.71182 9.31956 8.70744 9.08511C8.70307 8.85066 8.62938 8.62276 8.49567 8.43012C8.36196 8.23749 8.17422 8.08876 7.9561 8.00268C8.97981 7.47705 9.9165 6.79696 10.7333 5.9863C10.956 5.76353 11.0812 5.46139 11.0812 5.14634C11.0812 4.8313 10.956 4.52916 10.7333 4.30639C10.5105 4.08361 10.2084 3.95846 9.89331 3.95846C9.57826 3.95846 9.27612 4.08361 9.05335 4.30639C7.52199 5.76136 5.57207 6.69824 3.47922 6.98459L3.57818 6.76451C4.49731 4.70697 5.54152 2.37551 9.49985 2.37551C10.8862 2.37216 12.2244 2.8834 13.2553 3.81021C14.2863 4.73703 14.9366 6.01347 15.0803 7.3923C15.1073 7.64759 15.2164 7.88725 15.3911 8.07536C15.5658 8.26348 15.7967 8.38991 16.0493 8.43572C16.2104 8.46478 16.3561 8.54937 16.4613 8.67476C16.5664 8.80016 16.6243 8.95845 16.6249 9.12209C16.6251 9.22519 16.6047 9.3273 16.5651 9.42245C16.5254 9.5176 16.4671 9.60388 16.3937 9.67626C16.2462 9.82223 16.047 9.90391 15.8395 9.90347H15.8308H15.7026C15.4409 9.88358 15.1799 9.95032 14.9599 10.0934C14.7398 10.2364 14.573 10.4479 14.485 10.6951C14.0802 11.7019 13.3956 12.5716 12.5122 13.2017C11.6288 13.8317 10.5835 14.1957 9.49985 14.2505C8.48909 14.1643 7.51635 13.8248 6.67138 13.2635C5.82641 12.7021 5.13644 11.937 4.66514 11.0387C4.60723 10.8939 4.52137 10.7619 4.41245 10.6503C4.30353 10.5386 4.17369 10.4495 4.03034 10.3881C3.74083 10.264 3.41387 10.2599 3.12139 10.3769C2.82891 10.4938 2.59487 10.7222 2.47075 11.0117C2.34664 11.3012 2.34261 11.6282 2.45956 11.9206C3.10802 13.3602 4.18412 14.5651 5.54152 15.3715V17.813C5.54152 18.128 5.66663 18.43 5.88933 18.6527C6.11203 18.8754 6.41407 19.0005 6.72902 19.0005C7.04396 19.0005 7.34601 18.8754 7.56871 18.6527C7.79141 18.43 7.91652 18.128 7.91652 17.813V16.4133C8.43322 16.5506 8.96523 16.6219 9.49985 16.6255C10.0344 16.617 10.566 16.5442 11.0832 16.4086V17.813C11.0832 18.128 11.2083 18.43 11.431 18.6527C11.6537 18.8754 11.9557 19.0005 12.2707 19.0005C12.5856 19.0005 12.8877 18.8754 13.1104 18.6527C13.3331 18.43 13.4582 18.128 13.4582 17.813V15.4024C14.7077 14.6288 15.725 13.532 16.4024 12.2278C17.1305 12.0963 17.7894 11.7134 18.2641 11.1458C18.7388 10.5782 18.9992 9.86202 18.9999 9.12209C18.9998 8.55639 18.8436 8.00167 18.5484 7.51906C18.2533 7.03645 17.8306 6.64468 17.3271 6.38689Z"
                  fill="currentColor"
                  fill-opacity="0.42"
                />
              </svg>
              <select
                v-model="stageOne.salutation"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="salutation"
                required
              >
                <option value="" selected>Their preferred salutation</option>
                <option
                  v-for="title in Object.values(Title)"
                  :key="title"
                  :value="title"
                >
                  {{ title }}
                </option>
              </select>
            </label>
          </div>
          <button
            class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px] mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl disabled:opacity-50 transition-colors duration-300 mb-10"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
      <div v-show="activeStage === 2">
        <h2 class="font-semibold">Please enter the correct details below</h2>
        <form
          @submit.prevent="moveToNextStage(3)"
          class="sm:grid grid-cols-2 gap-10 overflow-y-auto"
        >
          <div class="px-1 pb-1">
            <label
              for="name"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                ></path>
              </svg>
              <input
                v-model="stageTwo.fullName"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] pl-11 placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="name"
                required
                placeholder="His/Her fullname"
              />
            </label>
            <!-- location -->
            <label for="country-code" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Their location<span class="text-red-500">*</span></strong
              >
              <div class="relative">
                <div
                  class="relative w-full flex items-center border-2 rounded-2xl pr-4 duration-100"
                  :class="
                    countriesIsVisible
                      ? ' border-primary border-opacity-90'
                      : ' border-black border-opacity-10'
                  "
                >
                  <input
                    type="text"
                    @click="makeCountriesVisible"
                    readonly
                    :value="newSelectedCountry"
                    placeholder="Country"
                    ref="country"
                    class="flex-1 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0"
                    name="country-code"
                    required
                  />
                  <img
                    v-if="newSelectedCountry"
                    @click="clearSelectedCountry"
                    class="w-6 duration-100 cursor-pointer"
                    src="/cancel.png"
                    alt="remove"
                  />
                </div>
                <Teleport to="body" v-if="countriesIsVisible">
                  <div
                    class="fixed w-full h-full z-10 top-0"
                    @click="makeCountriesInvisible"
                  ></div>
                </Teleport>
                <div
                  v-if="countriesIsVisible"
                  class="absolute left-0 top-[3.5rem] w-full z-20 bg-[#ccc] rounded-md p-4"
                >
                  <input
                    type="search"
                    ref="searchCountry"
                    @change="filterCountryList"
                    v-model="searchCountryInput"
                    class="border-2 border-gray-500 p-2 w-[80%] mx-auto rounded-lg outline-none"
                    placeholder="search"
                  />
                  <ul class="w-full text-black max-h-[20rem] overflow-auto">
                    <div class="mb-6"></div>
                    <li
                      v-for="(country, i) in countryList"
                      :key="i"
                      class="w-full mb-3 font-semibold hover:text-primary cursor-pointer duration-100"
                      @click="makeSelectedCountry(country._id)"
                    >
                      {{ country.country }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <label for="country-code" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Their location<span class="text-red-500">*</span></strong
              >
              <select
                v-model="stageTwo.countryCode"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="country-code"
                required
              >
                <option value="" selected>Select their location</option>
                <option
                  v-for="(country, i) in countryList"
                  :key="i"
                  :value="country._id"
                >
                  {{ country.country }}
                </option>
              </select>-->
            </label>
            <label
              for="phone"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                ></path>
              </svg>
              <input
                v-model="stageTwo.phoneNumber"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                :class="[
                  selectedCountryCode.length > 3 ? 'pl-[100px]' : 'pl-[92px]',
                ]"
                type="text"
                maxlength="10"
                name="phone"
                required
                placeholder="Their phone number"
              />
              <span
                class="absolute left-11 px-2 rounded-full bg-slate-200 font-medium"
                >{{ selectedCountryCode }}</span
              >
              <span class="absolute top-full right-0 text-xs"
                >example:
                <strong class="text-black font-semibold"
                  >9012345678</strong
                ></span
              >
            </label>
            <label
              for="gender"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                xml:space="preserve"
              >
                <g
                  style="
                    stroke: none;
                    stroke-width: 0;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: none;
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 56.831 0 v 6 h 10.573 L 53.909 19.496 c -4.395 -3.644 -10.034 -5.839 -16.176 -5.839 c -13.994 0 -25.379 11.385 -25.379 25.379 c 0 12.979 9.795 23.706 22.379 25.196 v 9.621 H 24.284 v 6 h 10.448 V 90 h 6 V 79.854 h 10.449 v -6 H 40.733 v -9.621 c 12.585 -1.49 22.38 -12.217 22.38 -25.196 c 0 -5.694 -1.886 -10.956 -5.065 -15.196 l 13.599 -13.599 v 10.574 h 6 V 0 H 56.831 z M 37.733 58.416 c -10.686 0 -19.379 -8.693 -19.379 -19.379 s 8.693 -19.379 19.379 -19.379 c 10.687 0 19.38 8.693 19.38 19.379 S 48.419 58.416 37.733 58.416 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: currentColor;
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                </g>
              </svg>
              <select
                v-model="stageTwo.gender"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="gender"
                required
              >
                <option value="" selected>Select their gender</option>
                <option
                  v-for="gender in Object.values(Gender)"
                  :key="gender"
                  :value="gender"
                >
                  {{ gender }}
                </option>
              </select>
            </label>
            <label
              for="marital-status"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0257 8C14.8955 8.00096 13.7784 8.24218 12.7484 8.70767C11.7185 9.17316 10.7993 9.85228 10.0517 10.7C9.57524 10.4684 9.07358 10.2925 8.55674 10.176L9.92574 7.447C10.0017 7.29485 10.0377 7.12583 10.0301 6.95593C10.0226 6.78602 9.97189 6.62084 9.88274 6.476C9.56529 6.01333 9.13828 5.63642 8.63977 5.37888C8.14127 5.12134 7.58677 4.99118 7.02574 5C6.46555 4.99201 5.91207 5.12257 5.4145 5.38007C4.91694 5.63758 4.49072 6.01404 4.17374 6.476C4.08459 6.62084 4.03386 6.78602 4.02634 6.95593C4.01881 7.12583 4.05475 7.29485 4.13074 7.447L5.49474 10.174C4.46571 10.4006 3.50111 10.8565 2.67286 11.5079C1.84462 12.1592 1.1741 12.9892 0.711311 13.9358C0.248523 14.8824 0.00540623 15.9213 8.91384e-05 16.9749C-0.00522795 18.0286 0.227392 19.0699 0.680603 20.0211C1.13381 20.9723 1.79592 21.809 2.61755 22.4686C3.43918 23.1283 4.39913 23.594 5.42583 23.8309C6.45252 24.0679 7.51946 24.07 8.54708 23.8371C9.5747 23.6043 10.5365 23.1424 11.3607 22.486C12.3841 23.2249 13.5678 23.7112 14.8151 23.9051C16.0623 24.0989 17.3378 23.9949 18.5372 23.6015C19.7365 23.2081 20.8258 22.5365 21.716 21.6416C22.6061 20.7466 23.2718 19.6537 23.6587 18.4522C24.0457 17.2508 24.1428 15.9748 23.9422 14.7286C23.7416 13.4824 23.2489 12.3013 22.5045 11.2819C21.7601 10.2626 20.785 9.43381 19.659 8.86341C18.533 8.29301 17.288 7.99714 16.0257 8ZM11.2597 19.63C10.5957 18.7672 10.1813 17.7386 10.0617 16.6564C9.94217 15.5742 10.122 14.48 10.5817 13.493C11.3741 14.2874 11.8728 15.3275 11.996 16.4427C12.1192 17.5579 11.8596 18.6818 11.2597 19.63ZM2.02574 17C2.02363 16.1803 2.2236 15.3727 2.60797 14.6487C2.99233 13.9247 3.54923 13.3066 4.22938 12.8491C4.90954 12.3917 5.69198 12.1089 6.50746 12.0258C7.32294 11.9428 8.14632 12.062 8.90474 12.373C8.19118 13.7623 7.90229 15.331 8.07407 16.8834C8.24585 18.4358 8.8707 19.9033 9.87074 21.103C9.12193 21.6254 8.24414 21.9323 7.33297 21.9904C6.4218 22.0484 5.51216 21.8553 4.70312 21.4322C3.89407 21.0091 3.21662 20.3721 2.74454 19.5906C2.27245 18.8091 2.02383 17.913 2.02574 17ZM16.0257 22C14.8607 22.0004 13.7211 21.6593 12.7477 21.019C13.7323 19.6273 14.1721 17.9227 13.9837 16.2283C13.7954 14.5339 12.992 12.9675 11.7257 11.826C12.4153 11.114 13.2705 10.5838 14.215 10.283C15.1594 9.98218 16.1637 9.92003 17.1381 10.1021C18.1124 10.2842 19.0265 10.7048 19.7985 11.3264C20.5706 11.948 21.1767 12.7512 21.5626 13.6642C21.9485 14.5772 22.1021 15.5716 22.0099 16.5585C21.9176 17.5454 21.5823 18.4941 21.0339 19.3198C20.4854 20.1454 19.741 20.8224 18.8671 21.2901C17.9931 21.7578 17.017 22.0017 16.0257 22ZM10.1307 3.553L11.1307 1.553C11.2493 1.31563 11.4573 1.13508 11.709 1.05106C11.8336 1.00946 11.9652 0.992814 12.0962 1.00207C12.2273 1.01132 12.3552 1.0463 12.4727 1.105C12.5903 1.1637 12.6951 1.24498 12.7812 1.34419C12.8673 1.4434 12.9331 1.5586 12.9747 1.68322C13.0163 1.80783 13.0329 1.93942 13.0237 2.07047C13.0144 2.20152 12.9794 2.32947 12.9207 2.447L11.9207 4.447C11.862 4.56453 11.7808 4.66935 11.6816 4.75548C11.5823 4.8416 11.4671 4.90734 11.3425 4.94894C11.2179 4.99054 11.0863 5.00719 10.9553 4.99793C10.8242 4.98868 10.6963 4.9537 10.5787 4.895C10.3414 4.77645 10.1608 4.56846 10.0768 4.31678C9.99279 4.06511 10.0122 3.79037 10.1307 3.553ZM1.13074 2.447C1.01219 2.20897 0.993052 1.93359 1.07754 1.68145C1.16202 1.42931 1.34321 1.22105 1.58124 1.1025C1.81927 0.983948 2.09465 0.96481 2.34679 1.0493C2.59894 1.13378 2.80719 1.31497 2.92574 1.553L3.92574 3.553C3.98444 3.67053 4.01942 3.79848 4.02867 3.92953C4.03793 4.06058 4.02128 4.19217 3.97968 4.31678C3.93808 4.4414 3.87234 4.5566 3.78622 4.65581C3.7001 4.75502 3.59527 4.8363 3.47774 4.895C3.36021 4.9537 3.23226 4.98868 3.10121 4.99793C2.97016 5.00719 2.83857 4.99054 2.71396 4.94894C2.46228 4.86492 2.25429 4.68437 2.13574 4.447L1.13074 2.447ZM6.02574 3V1C6.02574 0.734784 6.1311 0.48043 6.31863 0.292893C6.50617 0.105357 6.76053 0 7.02574 0C7.29096 0 7.54531 0.105357 7.73285 0.292893C7.92038 0.48043 8.02574 0.734784 8.02574 1V3C8.02574 3.26522 7.92038 3.51957 7.73285 3.70711C7.54531 3.89464 7.29096 4 7.02574 4C6.76053 4 6.50617 3.89464 6.31863 3.70711C6.1311 3.51957 6.02574 3.26522 6.02574 3Z"
                  fill="currentColor"
                />
              </svg>
              <select
                v-model="stageTwo.maritalStatus"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="marital-status"
                required
              >
                <option value="" selected>Select their marital status</option>
                <option
                  v-for="status in Object.values(MaritalStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
            </label>
            <label
              for="salutation"
              class="relative flex items-center mt-[20px] 2xl:mt-10"
            >
              <svg
                class="w-6 h-6 absolute left-3 text-primary"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.479 10.2922C11.2442 10.2922 11.0146 10.2225 10.8193 10.092C10.624 9.96156 10.4718 9.7761 10.3819 9.55911C10.292 9.34213 10.2685 9.10336 10.3143 8.87301C10.3602 8.64265 10.4733 8.43106 10.6393 8.26499C10.8054 8.09891 11.017 7.98581 11.2473 7.93999C11.4777 7.89417 11.7165 7.91769 11.9335 8.00757C12.1504 8.09745 12.3359 8.24965 12.4664 8.44494C12.5969 8.64022 12.6665 8.86981 12.6665 9.10468C12.6665 9.41962 12.5414 9.72167 12.3187 9.94437C12.096 10.1671 11.794 10.2922 11.479 10.2922ZM17.3271 6.38689C16.9616 4.58174 15.982 2.95895 14.555 1.79461C13.128 0.630264 11.3416 -0.00372118 9.49985 0.000509317C4.00014 0.000509317 2.37485 3.62793 1.40981 5.79472C1.21489 6.33044 0.938228 6.83276 0.589641 7.28384C0.367974 7.41007 0.192843 7.60431 0.0901757 7.83783C-0.0124914 8.07134 -0.0372371 8.3317 0.0196023 8.58038C0.0764417 8.82905 0.211845 9.05281 0.405765 9.21853C0.599686 9.38425 0.841816 9.48312 1.09631 9.50051C2.90472 9.57291 4.71003 9.29412 6.41235 8.67955C6.32789 8.8983 6.31009 9.13716 6.36118 9.36602C6.41228 9.59487 6.52998 9.80347 6.69946 9.96553C6.86894 10.1276 7.0826 10.2358 7.31351 10.2766C7.54443 10.3174 7.78225 10.289 7.997 10.1948C8.21175 10.1007 8.39382 9.94502 8.52025 9.74754C8.64668 9.55005 8.71182 9.31956 8.70744 9.08511C8.70307 8.85066 8.62938 8.62276 8.49567 8.43012C8.36196 8.23749 8.17422 8.08876 7.9561 8.00268C8.97981 7.47705 9.9165 6.79696 10.7333 5.9863C10.956 5.76353 11.0812 5.46139 11.0812 5.14634C11.0812 4.8313 10.956 4.52916 10.7333 4.30639C10.5105 4.08361 10.2084 3.95846 9.89331 3.95846C9.57826 3.95846 9.27612 4.08361 9.05335 4.30639C7.52199 5.76136 5.57207 6.69824 3.47922 6.98459L3.57818 6.76451C4.49731 4.70697 5.54152 2.37551 9.49985 2.37551C10.8862 2.37216 12.2244 2.8834 13.2553 3.81021C14.2863 4.73703 14.9366 6.01347 15.0803 7.3923C15.1073 7.64759 15.2164 7.88725 15.3911 8.07536C15.5658 8.26348 15.7967 8.38991 16.0493 8.43572C16.2104 8.46478 16.3561 8.54937 16.4613 8.67476C16.5664 8.80016 16.6243 8.95845 16.6249 9.12209C16.6251 9.22519 16.6047 9.3273 16.5651 9.42245C16.5254 9.5176 16.4671 9.60388 16.3937 9.67626C16.2462 9.82223 16.047 9.90391 15.8395 9.90347H15.8308H15.7026C15.4409 9.88358 15.1799 9.95032 14.9599 10.0934C14.7398 10.2364 14.573 10.4479 14.485 10.6951C14.0802 11.7019 13.3956 12.5716 12.5122 13.2017C11.6288 13.8317 10.5835 14.1957 9.49985 14.2505C8.48909 14.1643 7.51635 13.8248 6.67138 13.2635C5.82641 12.7021 5.13644 11.937 4.66514 11.0387C4.60723 10.8939 4.52137 10.7619 4.41245 10.6503C4.30353 10.5386 4.17369 10.4495 4.03034 10.3881C3.74083 10.264 3.41387 10.2599 3.12139 10.3769C2.82891 10.4938 2.59487 10.7222 2.47075 11.0117C2.34664 11.3012 2.34261 11.6282 2.45956 11.9206C3.10802 13.3602 4.18412 14.5651 5.54152 15.3715V17.813C5.54152 18.128 5.66663 18.43 5.88933 18.6527C6.11203 18.8754 6.41407 19.0005 6.72902 19.0005C7.04396 19.0005 7.34601 18.8754 7.56871 18.6527C7.79141 18.43 7.91652 18.128 7.91652 17.813V16.4133C8.43322 16.5506 8.96523 16.6219 9.49985 16.6255C10.0344 16.617 10.566 16.5442 11.0832 16.4086V17.813C11.0832 18.128 11.2083 18.43 11.431 18.6527C11.6537 18.8754 11.9557 19.0005 12.2707 19.0005C12.5856 19.0005 12.8877 18.8754 13.1104 18.6527C13.3331 18.43 13.4582 18.128 13.4582 17.813V15.4024C14.7077 14.6288 15.725 13.532 16.4024 12.2278C17.1305 12.0963 17.7894 11.7134 18.2641 11.1458C18.7388 10.5782 18.9992 9.86202 18.9999 9.12209C18.9998 8.55639 18.8436 8.00167 18.5484 7.51906C18.2533 7.03645 17.8306 6.64468 17.3271 6.38689Z"
                  fill="currentColor"
                  fill-opacity="0.42"
                />
              </svg>
              <select
                v-model="stageTwo.salutation"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none pl-11 focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="salutation"
                required
              >
                <option value="" selected>Their preferred salutation</option>
                <option
                  v-for="title in Object.values(Title)"
                  :key="title"
                  :value="title"
                >
                  {{ title }}
                </option>
              </select>
            </label>
          </div>
          <div class="px-1 pb-1">
            <!-- second column -->
          </div>
          <button
            class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px] mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl disabled:opacity-50 transition-colors duration-300 mb-10"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
      <div v-show="activeStage === 3">
        <form @submit.prevent="moveToNextStage(4)">
          <div
            class="grid sm:grid-cols-2 gap-x-10 grid-flow-dense px-1 pb-1 sm:max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            <label for="relationship" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Relationship<span class="text-red-500">*</span></strong
              >
              <select
                v-model="stageThree.relationshipToUser"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="relationship"
                required
              >
                <option value="" selected>
                  What is your relationship with them
                </option>
                <option
                  v-for="(relationship, i) in Object.values(Relationship)"
                  :key="i"
                  :value="relationship"
                >
                  {{ relationship.replace(/_/g, " ") }}
                </option>
              </select>
            </label>
            <label for="language" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Language<span class="text-red-500">*</span></strong
              >
              <input
                v-model="stageThree.nativeLanguage"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="language"
                required
                placeholder="What native language do they speak"
              />
            </label>
            <label for="their-pet-name" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Their pet name<span class="text-red-500">*</span></strong
              >
              <input
                v-model="stageThree.userPetNamesForClient"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                required
                name="their-pet-name"
                placeholder="What pet name do you call them"
              />
            </label>
            <label for="your-pet-name" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Your Petname<span class="text-red-500">*</span></strong
              >
              <input
                v-model="stageThree.clientPetNamesForUser"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="your-pet-name"
                required
                placeholder="What pet name do they call you"
              />
            </label>
            <label for="names-you-are-called" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >What name(s) do they know you as?<span class="text-red-500"
                  >*</span
                ></strong
              >
              <input
                v-model="stageThree.userNickNames"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                name="names-you-are-called"
                required
                placeholder="Enter the names they call you often"
              />
            </label>
            <label for="call-type" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Call type<span class="text-red-500">*</span></strong
              >
              <select
                v-model="category"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="call-type"
                required
              >
                <option value="">Select type of call</option>
                <option
                  v-for="(callType, i) in callTypes"
                  :key="i"
                  :value="{ id: callType._id, name: callType.name }"
                >
                  {{ callType.name }}
                </option>
              </select>
            </label>
            <label for="purpose" class="block mt-[20px] 2xl:mt-10 row-span-2">
              <strong class="font-semibold"
                >{{
                  category && category?.name == "apology"
                    ? "Describe what exactly happened between you and the person you want us to call"
                    : "Purpose of call"
                }}<span class="text-red-500">*</span></strong
              >
              <textarea
                v-model="stageThree.reasonForCall"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none min-h-[200px] max-h-[300px] focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="purpose"
                required
                placeholder="Brief description of why you are putting this together"
              >
              </textarea>
            </label>
            <label
              for="your-words"
              class="block my-[20px] 2xl:my-10 row-span-2"
            >
              <strong class="font-semibold"
                >{{
                  category && category?.name == "apology"
                    ? "What would you like us to say to them"
                    : "Use your words"
                }}<span class="text-red-500">*</span></strong
              >
              <textarea
                v-model="stageThree.customMessage"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none min-h-[200px] max-h-[300px] focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="your-words"
                required
                placeholder="If you were to make the call yourself, what would you tell them"
              >
              </textarea>
            </label>
            <label for="fav-song-or-poem" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Favorite song/poem<span class="text-red-500">*</span></strong
              >
              <input
                v-model="stageThree.favoriteSong"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                type="text"
                required
                name="fav-song-or-poem"
                placeholder="Enter your loved one’s favorite song or poem"
              />
            </label>
            <label
              for="fav-memories"
              class="block my-[20px] 2xl:my-10 row-span-2"
            >
              <strong class="font-semibold"
                >Please provide some favorite memories<span class="text-red-500"
                  >*</span
                ></strong
              >
              <textarea
                v-model="stageThree.favMemories"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none min-h-[200px] max-h-[300px] focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                required
                name="fav-memories"
                placeholder="Something that they did or got for you that you like"
              >
              </textarea>
            </label>
          </div>
          <button
            class="w-full sm:w-1/2 bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px] mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl disabled:opacity-50 transition-colors duration-300 mb-10"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
      <div v-show="activeStage === 4">
        <form
          @submit.prevent="createBooking"
          class="sm:grid grid-cols-2 gap-10 overflow-y-auto"
        >
          <div class="px-1 py-1">
            <label for="caller-gender" class="mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Caller Gender<span class="text-red-500">*</span></strong
              >
              <select
                v-model="stageFour.callerGender"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="caller-gender"
                required
              >
                <option value="" selected>
                  Which gender would you prefer the caller to be
                </option>
                <option
                  v-for="gender in Object.values(Gender)"
                  :key="gender"
                  :value="gender"
                >
                  {{ gender }}
                </option>
              </select>
            </label>

            <div class="mt-[20px] 2xl:mt-10">
              <strong class="flex-grow"
                >When would you want the call to be made</strong
              >
              <p class="mb-1 text-sm text-primary font-semibold">
                Call hours are between 08:30AM - 10:00PM WAT *
              </p>
              <div class="flex gap-4">
                <input
                  v-model="stageFour.whenToCallDate"
                  class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary flex-1"
                  type="date"
                  name="call-date"
                  required
                />
                <!-- <VueDatePicker
                  v-model="datePicker"
                  :min-time="{ hours: 8, minutes: 30 }"
                  :start-time="{ hours: 8, minutes: 30 }"
                  :max-time="{ hours: 22, minutes: 0 }"
                  placeholder="Select time"
                  class="dp__theme_light"
                  style="
                    --dp-border-radius: 10px;
                    --dp-time-font-size: 1rem;
                    --dp-input-padding: 11px 25px 11px 12px;
                  "
                  time-picker
                /> -->
                <!-- <input
                  v-model="stageFour.whenToCallTime"
                  class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                  type="time"
                  min="08:30"
                  max="22:00"
                  @blur="checkTime"
                  name="call-time"
                  required
                /> -->
                <div class="flex-1 relative">
                  <input
                    v-model="stageFour.whenToCallTime"
                    class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary cursor-pointer"
                    name="call-time"
                    type="text"
                    placeholder="Select time"
                    readonly
                    @click="showTimePicker = !showTimePicker"
                    required
                  />
                  <div v-if="showTimePicker">
                    <Teleport to="body">
                      <div
                        class="fixed z-20 h-full w-full top-0"
                        @click="showTimePicker = false"
                      ></div>
                    </Teleport>
                    <ul
                      class="max-h-[10rem] overflow-auto absolute -bottom-[10rem] w-full bg-white rounded-md shadow-md py-6 z-30"
                    >
                      <li
                        v-for="time in timeRange"
                        :key="time"
                        class="py-2 cursor-pointer px-4"
                        :class="
                          stageFour.whenToCallTime == time
                            ? ' font-semibold bg-slate-100'
                            : 'text-black'
                        "
                        @click="saveTime(time)"
                      >
                        {{ time }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4" v-if="category && category?.name == 'apology'">
              <p class="text-primary font-semibold italic">
                Apology calls are not recorded *
              </p>
            </div>
            <div class="mt-4" v-else>
              <div class="flex gap-3 items-center">
                <Switch v-model="stageFour.isRecorded" />
                <strong class="flex-grow">Call Record</strong>
              </div>
              <span class="text-md font-semibold"
                >Do you want this call to be recorded</span
              >
            </div>

            <label for="payment-plan" class="block mt-[20px] 2xl:mt-10">
              <strong class="font-semibold"
                >Payment Package<span class="text-red-500">*</span></strong
              >
              <select
                v-model="stageFour.chargeType"
                class="w-full border-2 border-black border-opacity-10 rounded-2xl px-[18px] py-[14px] placeholder-opacity-50 outline-none focus:border-opacity-0 focus:ring-2 focus:ring-primary"
                name="payment-plan"
                required
              >
                <option value="" selected>Please select payment package</option>
                <option
                  v-for="plan in Object.values(chargeType)"
                  :key="plan"
                  :value="plan"
                >
                  {{ plan }} - ₦{{ getCharge(plan).price }}
                </option>
              </select>
            </label>
            <div>{{getCharge(stageFour.chargeType as chargeType).message}}</div>
          </div>

          <div></div>

          <button
            class="w-full bg-primary hover:bg-orange-500 text-white rounded-2xl px-[18px] py-[14px] mt-[20px] 2xl:mt-10 outline-none text-xl 2xl:text-2xl disabled:opacity-50 transition-colors duration-300 mb-10"
            type="submit"
            :disabled="creatingBooking"
          >
            <template v-if="!creatingBooking"> Done </template>
            <Loader class="mx-auto" v-else />
          </button>
        </form>
      </div>
    </div>
    <Payment
      v-model="showPaymentModal"
      :callType="getCallType(stageThree.category)"
      :recipient="stageTwo.fullName"
      :paymentPlan="(stageFour.chargeType as chargeType)"
      :amount="getCharge(stageFour.chargeType as chargeType).price"
      :bookingId="bookingId"
    />
    <Modal v-model="showTAndCModal">
      <div class="max-w-xl mx-auto px-5 py-8">
        <h2 class="text-2xl font-semibold">
          PLEASE, DO READ THESE TERMS OF AGREEMENTS
        </h2>
        <div class="space-y-4 mt-4">
          <p>
            <strong>Note 1:</strong> We make calls from 8:30am to 10pm. You'll
            get a feedback about your call, within an hour after your call is to
            be made.
          </p>
          <p>
            <strong>Note 2:</strong> If for any reason you would want to get a
            refund on your payment for a call booked, kindly note that you would
            be getting a 70% return on your actual payment after careful review.
          </p>
          <p>
            <strong>Note 3:</strong> Please, be informed that the recording of
            the call to be made is solely dependent on the consent of whom we're
            calling. If the person does not consent that we record & share our
            conversation with them, the call will not be recorded or the audio
            recording shared.
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// import VueDatePicker from "@vuepic/vue-datepicker";
// import "@vuepic/vue-datepicker/dist/main.css";
import allTime from "@/composables/time";

import { useBookingStore } from "@/stores/booking";
import { useAuthStore } from "@/stores/auth";
import { Gender, MaritalStatus, Title } from "@/types/auth";
import {
  chargeType,
  BookingData,
  BookingType,
  GuestDetails,
  Relationship,
} from "@/types/booking";
import { useToasterStore } from "@/stores/toaster";
import { useXScrollTo } from "@/composables/xScrollTo";

const stageList = [
  { name: "their details", stage: 1 },
  { name: "loved one details", stage: 2 },
  { name: "about loved one", stage: 3 },
  { name: "call setting", stage: 4 },
];

const bookingStore = useBookingStore();
const bookingStageInfo = useCookie("bookingStageInfoGuest", {
  default: () => ({
    activeStage: 1,
    maxProgress: 1,
  }),
});
bookingStore.setActiveStage2(bookingStageInfo.value.activeStage);
bookingStore.setMaxProgress2(bookingStageInfo.value.maxProgress);

const activeStage = computed(() => bookingStore.activeStage2);
const maxProgress = computed(() => bookingStore.maxProgress2);

const scrollToNav = useXScrollTo("#stage-nav");
const switchStage = (stage: number) => {
  if (stage <= maxProgress.value) {
    bookingStore.setActiveStage2(stage);
  }
  scrollToNav(stage);
};
const moveToNextStage = (stage: number) => {
  bookingStageInfo.value.activeStage = stage;
  bookingStageInfo.value.maxProgress = Math.max(stage, maxProgress.value);
  bookingStore.setActiveStage2(stage);
  bookingStore.setMaxProgress2(bookingStageInfo.value.maxProgress);
  scrollToNav(stage);
};

const authStore = useAuthStore();
const bookingId = ref<string>(); // gotten after booking draft has been created
const stageOne = useCookie("stageOneFormGuest", {
  default: () => ({
    fullName: "",
    phoneNumber: "",
    gender: "",
    location: "",
    maritalStatus: "",
    terms: false,
    salutation: "",
  }),
  watch: true,
});
const stageTwo = useCookie("stageTwoFormGuest", {
  default: () => ({
    fullName: "",
    countryCode: "",
    phoneNumber: "",
    gender: "",
    location: "",
    maritalStatus: "",
    salutation: "",
  }),
  watch: true,
});
const stageThree = useCookie("stageThreeFormGuest", {
  default: () => ({
    relationshipToUser: "",
    userPetNamesForClient: "",
    clientPetNamesForUser: "",
    category: "", // callType
    reasonForCall: "",
    customMessage: "",
    nativeLanguage: "",
    favoriteSong: "",
    userNickNames: "",
    favMemories: "",
  }),
  watch: true,
});
const stageFour = useCookie("stageFourFormGuest", {
  default: () => ({
    callerGender: "",
    whenToCallDate: "",
    whenToCallTime: "",
    isRecorded: false,
    chargeType: "",
  }),
  watch: true,
});

const callTypes = computed(() => bookingStore.callTypes);
// fetch call types if not already fetched
onMounted(() => {
  if (bookingStore.callTypes.length) return;
  bookingStore.fetchCallTypes();
});
// const countryList = computed(() => bookingStore.countryCodes);
onMounted(() => {
  if (bookingStore.countryCodes.length) return;
  bookingStore.fetchCountryCodes();
});
// selected country code to make user know that they shouldn't include country code
const selectedCountry = computed(() =>
  countryList.value.find((c) => c._id === stageTwo.value.countryCode)
);
const selectedCountryCode = computed(
  () => selectedCountry.value?.dialCode || "+234"
);
const getCharge = (plan: chargeType): { price: number; message: string } => {
  if (!plan) return { price: 0, message: "" }; // return default value
  switch (plan) {
    case chargeType.BASIC:
      return {
        price: selectedCountry.value?.basicCharge || 0,
        message: "Call is made by Ordinary Callers",
      };
    case chargeType.STANDARD:
      return {
        price: selectedCountry.value?.standardCharge || 0,
        message: "Standard Call is made by Experienced Callers",
      };
    case chargeType.PREMIUM:
      return {
        price: selectedCountry.value?.premiumCharge || 0,
        message:
          "Premium calls are made by our most skilled callers including the CEO himself.",
      };
  }
};
const getCallType = computed(
  () => (callType: string) =>
    callTypes.value.find((c) => c._id === callType)?.name || "Call Type"
);

const toasterStore = useToasterStore();
const router = useRouter();
const creatingBooking = computed(() => bookingStore.requesting);
const bookingType = computed(() => bookingStore.bookingFor || BookingType.SELF);

const createBooking = async () => {
  const userData: GuestDetails = {
    fullName: stageOne.value.fullName,
    phoneNumber: stageOne.value.phoneNumber,
    gender: stageOne.value.gender as Gender,
    location: stageOne.value.location,
    maritalStatus: stageOne.value.maritalStatus as MaritalStatus,
    title: stageOne.value.salutation as Title,
  };

  const newStageFourDateString = `${stageFour.value.whenToCallDate}T${stageFour.value.whenToCallTime}:00`;
  const payload: BookingData = {
    createdBy: authStore.getUserId,
    fullName: stageTwo.value.fullName,
    phoneNumber: stageTwo.value.phoneNumber,
    gender: stageTwo.value.gender as Gender,
    location: selectedCountry.value?.country || "",
    title: stageTwo.value.salutation as Title,
    maritalStatus: stageTwo.value.maritalStatus as MaritalStatus,
    countryCode: stageTwo.value.countryCode,
    relationshipToUser: stageThree.value.relationshipToUser as Relationship,
    category: stageThree.value.category,
    reasonForCall: stageThree.value.reasonForCall,
    customMessage: stageThree.value.customMessage,
    nativeLanguage: stageThree.value.nativeLanguage,
    favoriteSong: stageThree.value.favoriteSong,
    userNickNames: stageThree.value.userNickNames
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
    favoriteMemories: stageThree.value.favMemories,
    clientPetNamesForUser: stageThree.value.clientPetNamesForUser
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
    userPetNamesForClient: stageThree.value.userPetNamesForClient
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
    chargeType: stageFour.value.chargeType as chargeType,
    isRecorded: JSON.parse(String(stageFour.value.isRecorded)),
    availabilityCalendar: [
      {
        from: new Date(newStageFourDateString).toISOString(),
        // + 1 hour
        to: new Date(
          new Date(newStageFourDateString).getTime() + 60 * 60 * 1000
        ).toISOString(),
      },
    ],
    bookingType: bookingType.value as BookingType,
    callerGender: stageFour.value.callerGender as Gender,
    price: getCharge(stageFour.value.chargeType as chargeType).price,
    guestDetails: userData,
  };

  try {
    // this creates a draft
    const res = await bookingStore.attemptBooking({
      bookingPayload: payload,
    });
    bookingId.value = res.booking._id;

    // show the payment modal
    showPaymentModal.value = true;
  } catch (error) {
    toasterStore.showToaster({
      message: "Something went wrong",
      type: "error",
    });
  }
};

const showPaymentModal = ref(false);
const showTAndCModal = ref(false);

//Google autofill
const location = ref(null);
onMounted(() => {
  if (window.google) {
    const autocomplete = new google.maps.places.Autocomplete(location.value, {
      types: ["(cities)"],
    });
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      stageOne.value.location = place.formatted_address;
    });
  }
});

// Time hiding functionality
const checkTime = () => {
  const tooEarly = ["00", "01", "02", "03", "04", "05", "06", "07"];
  const tooLate = ["23", "24"];
  console.log(stageFour.value.whenToCallTime);
  if (tooEarly.includes(stageFour.value.whenToCallTime.split(":")[0])) {
    stageFour.value.whenToCallTime = "08:30";
  }
  if (tooLate.includes(stageFour.value.whenToCallTime.split(":")[0])) {
    stageFour.value.whenToCallTime = "22:00";
  }
  if (
    stageFour.value.whenToCallTime.split(":")[0] == "08" &&
    stageFour.value.whenToCallTime.split(":")[1] * 1 < 30
  ) {
    stageFour.value.whenToCallTime = "08:30";
  }
  if (
    stageFour.value.whenToCallTime.split(":")[0] == "22" &&
    stageFour.value.whenToCallTime.split(":")[1] * 1 > 1
  ) {
    stageFour.value.whenToCallTime = "22:00";
  }
};

watch(stageFour.value, (val: string) => {
  let timeTimer = setTimeout(() => {
    checkTime();
  }, 8000);
  clearTimeout(timeTimer);
  timeTimer = setTimeout(() => {
    checkTime();
  }, 8000);
});

//Search Country
const countriesIsVisible = ref(false);
const searchCountryInput = ref("");

const newSelectedCountry = computed(() => {
  const country = countryList.value.find(
    (country) => country._id == stageTwo.value?.countryCode
  );
  return country?.country;
});
onMounted(() => {
  newCountry();
});

// watch(searchCountryInput, () => {
//   if (searchCountryInput.value !== "") {
//     countryList.value = bookingStore.countryCodes.filter((country) =>
//       country.country
//         .toLowerCase()
//         .includes(searchCountryInput.value.toLowerCase())
//     );
//     console.log(countryList.value);
//   } else {
//     countryList.value = bookingStore.countryCodes;
//   }
// });
const filterCountryList = () => {
  if (searchCountryInput.value) {
    countryList.value = bookingStore.countryCodes.filter((country) =>
      country.country
        .toLowerCase()
        .includes(searchCountryInput.value.toLowerCase())
    );
  } else {
    countryList.value = bookingStore.countryCodes;
  }
};

const countryList = computed(() => {
  if (searchCountryInput.value !== "") {
    return bookingStore.countryCodes.filter((country) =>
      country.country
        .toLowerCase()
        .includes(searchCountryInput.value.toLowerCase())
    );
  } else {
    return bookingStore.countryCodes;
  }
});

const makeCountriesVisible = () => {
  countriesIsVisible.value = true;
};
const makeCountriesInvisible = () => {
  countriesIsVisible.value = false;
};
const newCountry = () => {
  const selectedCountry = countryList.value.find(
    (country: any) => country._id == stageTwo.value?.countryCode
  );
  newSelectedCountry.value = selectedCountry?.country;
};
const clearSelectedCountry = () => {
  stageTwo.value.countryCode = "";
  newCountry();
  makeCountriesInvisible();
  searchCountryInput.value = "";
};
const makeSelectedCountry = (id: string) => {
  const selectedCountry = countryList.value.find(
    (country) => country._id == id
  );
  stageTwo.value.countryCode = selectedCountry._id;
  newCountry();
  makeCountriesInvisible();
  searchCountryInput.value = "";
};

//Call Type setting
const category = ref("");
watch(category, (newVal: any) => {
  console.log(newVal);
  stageThree.value.category = newVal.id;
  console.log(stageThree.value.category);
});
onMounted(() => {
  setTimeout(() => {
    if (stageThree.value.category && callTypes.value.length) {
      category.value = callTypes.value.find(
        (c) => c._id === stageThree.value.category
      );
    }
  }, 2000);
});

//Date
// const datePicker = ref(new Date());
// watch(datePicker, () => {
//   stageFour.value.whenToCallTime = `${datePicker.value?.hours}:${datePicker.value?.minutes}`;
// });

// Date
const showTimePicker = ref(false);
const timeRange = allTime("08:30", "22:00");
const saveTime = (time: string) => {
  stageFour.value.whenToCallTime = time;
  // console.log(stageFour.value.whenToCallTime);/
  showTimePicker.value = false;
};
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  pointer-events: none;
}
.dp__theme_light {
  --dp-highlight-color: #ffa500;
}
</style>