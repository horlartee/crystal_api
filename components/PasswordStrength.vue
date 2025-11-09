<template>
  <div class="w-full text-gray-400">
    <ul class="h-[4px] flex gap-4">
      <li
        v-for="n in 3" :key="n"
        class="bg-gray-200 flex-grow transition-colors duration-300 rounded"
        :class="getBarColor(n)">
      </li>
    </ul>
    <p v-if="!hideDetails">{{ modelValue?.message }}</p>
  </div>
</template>

<script setup lang="ts">
interface ModelValue {
  ok: boolean
  strength: number
  message: string
}
interface Props {
  password: string | null
  modelValue: ModelValue | null
  hideDetails?: boolean
}
enum Strength {
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3
}
const props = withDefaults(defineProps<Props>(), {
  hideDetails: false
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: ModelValue | null): void
}>()

const validatePassword = (pass:any): ModelValue | null => {
  if (!pass) return null
  const password = typeof pass === 'string' ? pass.trim() : pass
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSymbol = !(/^[a-zA-Z0-9]*$/g.test(password))

  let strength: Strength
  let message: string
  if (password.length < minLength) {
    strength = Strength.WEAK
  } else if (password.length >= minLength && (!hasUppercase || !hasLowercase || !hasNumber || !hasSymbol)) {
    strength = Strength.MEDIUM
  } else {
    strength = Strength.STRONG
  }

  if(password.length < minLength) message = `password must be at least ${minLength} characters`
  else if(!hasUppercase) message = 'password should contain at least one uppercase'
  else if(!hasLowercase) message = 'password should contain at least one lowercase'
  else if(!hasNumber) message = 'password should contain at least one number'
  else if(!hasSymbol) message = 'password should contain at least one symbol'
  else message = 'password is strong'

  return {
    ok: strength === Strength.STRONG || strength === Strength.MEDIUM,
    strength,
    message
  } as ModelValue
}
const getBarColor = (n: number) => {
  if (!props.modelValue) return
  return [
    { 'bg-pink-600': props.modelValue.strength === Strength.WEAK && n <= 1 },
    { 'bg-yellow-600': props.modelValue.strength === Strength.MEDIUM && n <= 2 },
    { 'bg-green-600': props.modelValue.strength === Strength.STRONG && n <= 3 }
  ]
}

watch(() => props.password, (val) => {
  emits('update:modelValue', validatePassword(val))
})
</script>