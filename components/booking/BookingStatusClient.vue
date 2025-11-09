<template>
  <div :class="statusColorText" class="capitalize relative flex items-center">
    <strong>{{ bookingStatus.toLocaleLowerCase() }}</strong>
    <StatusColor :status="bookingStatus" class="absolute right-[104%]" />
  </div>
</template>

<script setup lang="ts">
import StatusColor from '@/components/booking/StatusColor.vue'
import { BookingStatus } from '@/types/booking'

interface Props {
  status: BookingStatus
}
const props = defineProps<Props>()
const bookingStatus = ref(Object.entries(BookingStatus).find(([key, value]) => key === props.status)?.[1] as BookingStatus)
const statusColorText = computed(()=>{
  switch(props.status) {
    case BookingStatus.PENDING:
      return 'text-violet-500'
    case BookingStatus.APPROVED:
      return 'text-sky-500'
    case BookingStatus.IN_PROGRESS:
      return 'text-yellow-500'
    case BookingStatus.ASSIGNED:
      return 'text-orange-500'
    case BookingStatus.ON_HOLD:
      return 'text-stone-600'
    case BookingStatus.COMPLETED:
      return 'text-green-500'
    case BookingStatus.REJECTED:
      return 'text-rose-500'
  }
})
</script>