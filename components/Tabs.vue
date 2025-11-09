<template>
  <div>
    <div
      ref="tab"
      v-for="(tab, i) in tab_list" :key="i"
      @click="handleTabClicks(tab)"
      class="sm:tw-w-auto tw-text-center sm:tw-text-left">
      <slot
        name="tab"
        :tab="tab"
        :is_active="getActiveTabName(active_tab)===getActiveTabName(tab)"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type TabMinimal = string
interface TabExtended {
  name: string,
  icon?: string
  slug?: string
}
interface Props {
  tab_list: TabMinimal[] | TabExtended[]
  modelValue: TabMinimal | TabExtended | null | undefined
  auto_add_query?: boolean
  query_name?: string
}
const props = withDefaults(defineProps<Props>(), {
  auto_add_query: true,
  query_name: 'tab'
})
// const props = defineProps({
//   tab_list: {
//     type: Array,
//     required: true,
//   },
//   modelValue: {
//     type: String,
//     required: true,
//   },
//   auto_add_query: {
//     type: Boolean,
//     default: true
//   },
//   query_name:{
//     type: String,
//     default: 'tab'
//   }
// })
const emit = defineEmits(["update:modelValue", "tab-click"])
const router = useRouter()

const getActiveTabName = (tab: TabMinimal | TabExtended) => {
  return typeof tab === 'string' ? tab : tab?.name
}
const tabTypeInference = (tab: TabMinimal | TabExtended) => {
  return typeof tab === 'string' ? tab as TabMinimal : tab as TabExtended
}

// remove all ' ' and make lowercase
const serialize_query = (query: string) => query.toLowerCase().replace(/ /g, '_')

const active_tab = ref(props.modelValue || props.tab_list[0])
// set tab from query param
const { [props.query_name]: tab_q } = router.currentRoute.value.query
if (tab_q) {
  props.tab_list.forEach(tab => {
    if (serialize_query(getActiveTabName(tab)) === tab_q) {
      active_tab.value = getActiveTabName(tab)
      emit("update:modelValue", tab)
    }
  })
}
// if query is not set && model value is not set, set model value to first tab
if (!tab_q && !props.modelValue) {
  emit("update:modelValue", props.tab_list[0])
}
const isExtended = computed(()=>Object.keys(props.tab_list[0]).length > 1 ? true : false)

// update model value and emit tab-click event
const handleTabClicks = (tab: TabMinimal | TabExtended) => {
  active_tab.value = getActiveTabName(tab)
  // add query to url
  if (props.auto_add_query) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        [props.query_name]: serialize_query(getActiveTabName(active_tab.value))
      },
      // this would help tab switching & scroll-to-top coexist
      // [intended behaviour]: if id of section is added, instead of scrolling to top:0,
      // it would scroll to id=#query_name
      // hash: `#${props.query_name}`
    })
  }
  emit("update:modelValue", tab)
  emit("tab-click", tab)
}

// for when tab links aren't used for navigation, watch modelValue
watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if(!!newVal) {
      handleTabClicks(newVal)
    }
  }
})

// for when the back button is used for navigation, watch query
watch(() => router.currentRoute.value.query, (newVal, oldVal) => {
  if (newVal[props.query_name] !== oldVal[props.query_name]) {
    props.tab_list.forEach(tab_name => {
      if (serialize_query(getActiveTabName(tab_name)) === newVal[props.query_name]) {
        active_tab.value = getActiveTabName(tab_name)
        emit("update:modelValue", tab_name)
      }
    })
  }
})
</script>