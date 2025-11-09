<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Loader class="[&>*]:!bg-primary" />
    <p>please wait..</p>

    <Modal v-model="successModal" @update:model-value="redirectToDashboard">
      <div class="max-w-xl p-10">
        <div class="flex flex-col items-center justify-center gap-3">
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
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '@/stores/toaster'
import { useBookingStore } from '@/stores/booking'
import { PaymentStatus } from '@/types/payment'

const route = useRoute()
const router = useRouter()
const toasterStore = useToasterStore()
const bookingStore = useBookingStore()

const successModal = ref(false)
// check for the status query param
const proccessPaymentRedirectUrl = async (status: PaymentStatus | undefined) => {
  if(!status) {
    // take user back dashboard because they
    // probably came here through using the address bar
    toasterStore.showToaster({
      message: 'Invalid payment status',
      type: 'error',
    })
    console.log('Invalid payment status')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push('/')
    return
  }

  if (status !== PaymentStatus.SUCCESSFUL && status !== PaymentStatus.COMPLETED) {
    // take user back to the booking page
    toasterStore.showToaster({
      message: 'Payment failed',
      type: 'error',
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push('/booking')
    return
  }

  // clear booking data from cookie
  bookingStore.clearBookingData(bookingStore.bookingFor)

  // redirect to success page
  // router.push('/payment/success')
  // OR use modal
  successModal.value = true
}
onMounted(() => proccessPaymentRedirectUrl(route?.query?.status as PaymentStatus | undefined))
const redirectToDashboard = () => router.push('/')
</script>