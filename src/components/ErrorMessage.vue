<template>
  <div class="error-message">
    <p><strong>An error occurred!</strong></p>
    <p v-if="errorType === 'no-information-for-today'">
      Wikipedia doesn't give access to the top pages before the end of the day.
      Past dates should be fine though.
    </p>
    <p v-else-if="errorType === 'no-information-before-2015'">
      Unfortunately Wikipedia doesn't provide this information for days before
      <router-link :to="{ name: 'exact-date', params: { date: '2015-07-02' } }"
        >July 2nd, 2015</router-link
      >.
    </p>
    <p v-else-if="errorType === 'general-problem'">
      This might be because the page hit Wikipedia's rate limit. Try again
      later.
    </p>
  </div>
</template>

<script lang="ts">
import * as DateFns from 'date-fns'
import { computed, ComputedRef, defineComponent, PropType } from 'vue'

type ErrorType =
  | 'no-information-for-today'
  | 'no-information-before-2015'
  | 'general-problem'

export default defineComponent({
  props: {
    date: {
      type: Object as PropType<Date>,
      required: true,
    },
  },
  setup(props) {
    const errorType: ComputedRef<ErrorType> = computed(() => {
      if (DateFns.isAfter(props.date, DateFns.startOfYesterday())) {
        return 'no-information-for-today'
      } else if (
        DateFns.isBefore(props.date, DateFns.startOfDay(new Date('2015-07-02')))
      ) {
        return 'no-information-before-2015'
      } else {
        return 'general-problem'
      }
    })

    return { errorType }
  },
})
</script>
