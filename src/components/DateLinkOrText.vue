<template>
  <router-link
    v-if="date"
    :to="{ name: 'exact-date', params: { date: formattedDate } }"
    ><slot></slot
  ></router-link>
  <span v-else><slot></slot></span>
</template>

<script lang="ts">
import * as DateFns from 'date-fns'
import { computed, ComputedRef, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    date: Object as PropType<Date>,
  },
  setup(props) {
    const formattedDate: ComputedRef<string> = computed(() => {
      return DateFns.format(props.date!, 'yyyy-MM-dd')
    })

    return { formattedDate }
  },
})
</script>
