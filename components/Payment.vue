<template>
  <div>
    <Modal v-model="paymentSummaryModal">
      <div class="sm:flex flex-col items-center justify-center w-full gap-2 px-10 py-5">
        <div class="sm:w-[500px] transition-all duration-300">
          <h3 class="text-2xl font-bold text-center text-primary">CHECKOUT</h3>
          <p class="text-center">Make payment to confirm your booking</p>
          <div class="mt-6">
            <div
              class="border-b last-of-type:border-b-0 flex justify-between py-2">
              <p class="text-sm">Call Type</p>
              <strong class="capitalize">{{ callType }}</strong>
            </div>
            <div
              class="border-b last-of-type:border-b-0 flex justify-between py-2">
              <p class="text-sm">Recipient</p>
              <strong class="max-w-[70%] truncate">{{ recipient }}</strong>
            </div>
            <div
              class="border-b last-of-type:border-b-0 flex justify-between py-2">
              <p class="text-sm">Payment Plan</p>
              <strong>{{ paymentPlan }}</strong>
            </div>
            <div
              class="border-b last-of-type:border-b-0 flex justify-between py-2">
              <p class="text-sm">Amount</p>
              <strong>₦{{ amount }}</strong>
            </div>
          </div>
          
          <div class="mt-10 flex sm:justify-center font-bold">
            <button
              @click="initPayment"
              class="p-2 sm:px-10 bg-primary hover:bg-orange-500 text-white rounded-lg
              transition-colors duration-300 flex-grow sm:flex-grow-0 text-center"
              :disabled="requesting">
              <template v-if="!requesting">
                Pay ₦{{ amount }}
              </template>
              <Loader class="mx-auto" v-else />
            </button>
          </div>
        </div>
      </div>
    </Modal>

    <!-- <Modal>
      <div class="sm:flex flex-col items-center justify-center w-full gap-2 px-10 py-5">
        <div class="sm:w-[500px] transition-all duration-300">
          <h3 class="text-2xl font-bold text-center text-primary">PAYMENT SUCCESSFUL</h3>
          <p class="text-center">You have successfully placed a new booking and it will be attended to as soon as possible</p>
          <img
            src="/images/night-calls.svg" alt="call illustration"
            class="max-w-[200px] mx-auto my-6">
          <div class="mt-10 flex sm:justify-center font-bold">
            <button
              @click="()=>bookingStore.updateBookingAbortStatus(true)"
              class="p-2 sm:px-10 bg-primary hover:bg-orange-500 text-white rounded-lg
              transition-colors duration-300 flex-grow sm:flex-grow-0 text-center">
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </Modal> -->
  </div>
</template>

<script setup lang="ts">
import { useFlutterwave } from "flutterwave-vue3"
import { chargeType } from "@/types/booking"
import { useAuthStore } from "@/stores/auth"
import { useToasterStore } from "@/stores/toaster"
import { useBookingStore } from "@/stores/booking"
import { PaymentProcessors } from "@/types/payment"

interface Props {
  // booking details
  callType: string
  recipient: string
  paymentPlan: chargeType
  amount: number
  // modal
  modelValue: boolean
  bookingId?: string
}
const props = withDefaults(defineProps<Props>(), {
  callType: '',
  recipient: '',
  paymentPlan: '' as chargeType,
  amount: 0,
  modelValue: false
})
const emits = defineEmits([
  'update:modelValue',
  'success', 'closed',
])
const amount = computed(() => props.amount > 0 ? props.amount.toLocaleString() : 0)

const paymentSummaryModal = ref(props.modelValue)
watch(() => props.modelValue, (val) => paymentSummaryModal.value = val)
watch(paymentSummaryModal, (val) => emits('update:modelValue', val))

const requesting = ref(false)
const authStore = useAuthStore()
const toasterStore = useToasterStore()
const bookingStore = useBookingStore()
const router = useRouter()
const initPayment = async (ev: any) =>{
  requesting.value = true
  // this is used to reset the value of isPaymentSuccessful
  const config = useRuntimeConfig().public
  const trx_ref = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  try {
    const res = await $fetch(config.paymentServiceUrl+'/transaction/payment_link',{
      method: 'POST',
      headers: {
        "client-id": config.paymentLinkGenerationClientId,
      },
      body: JSON.stringify({
        amount: props.amount,
        currency: 'NGN',
        processor: PaymentProcessors.FLUTTERWAVE, // this is the only processor we are using for now
        phone_number: authStore.user.phoneNumber,
        email: authStore.getEmail,
        client_reference: `${props?.bookingId}-${trx_ref}`,
        call_back_url: config.webUrl+'/payment/success',
      })
    }) as {
      message: string
      data: {
        payment_link: string
        // note: there are other fields in the response but we are only interested in the payment_link at the moment
      }
      statusCode: number
    }
    requesting.value = false
    const link = res.data.payment_link
    if(!link) {
      toasterStore.showToaster({
        message: 'An error occured while trying to initiate payment',
        type: 'error'
      })
      return
    }
    
    toasterStore.showToaster({
      message: 'Taking you to payment page',
      type: 'success'
    })
    setTimeout(()=>{window.location.href=link}, 2000)
  } catch (error) {
    toasterStore.showToaster({
      message: 'An error occured while trying to initiate payment',
      type: 'error'
    })
  }
}
</script>
