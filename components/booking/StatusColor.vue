<template>
  <div class="h-2 w-2 rounded-full" :class="statusColor"></div>
</template>

<script setup lang="ts">
import { BookingStatus } from '@/types/booking'
interface Props {
  status: BookingStatus
}
const props = defineProps<Props>()
const statusColor = computed(()=>{
  switch(props.status) {
    case BookingStatus.PENDING:
      return 'bg-violet-500'
    case BookingStatus.APPROVED:
      return 'bg-sky-500'
    case BookingStatus.IN_PROGRESS:
      return 'bg-yellow-500'
    case BookingStatus.ASSIGNED:
      return 'bg-orange-500'
    case BookingStatus.ON_HOLD:
      return 'bg-stone-600'
    case BookingStatus.COMPLETED:
      return 'bg-green-500'
    case BookingStatus.REJECTED:
      return 'bg-rose-500'
  }
})
</script>