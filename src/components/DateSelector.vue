<template>
  <div class="date-selector">
    <span class="date-selector__current-date">{{ formattedDate }}</span>
    <div class="date-selector__past--desktop">
      ←
      <date-link-or-text :date="previousMonth"
        >Previous month</date-link-or-text
      >
      <span class="date-selector__separator">·</span>
      <date-link-or-text :date="previousDay">Previous day</date-link-or-text>
    </div>
    <div class="date-selector__past--mobile">
      <strong class="date-direction-label">← Past</strong>
      <date-link-or-text :date="previousDay">Previous day</date-link-or-text>
      <date-link-or-text :date="previousMonth"
        >Previous month</date-link-or-text
      >
    </div>
    <div class="date-selector__future--desktop">
      <date-link-or-text :date="nextDay">Next day</date-link-or-text>
      <span class="date-selector__separator">·</span>
      <date-link-or-text :date="nextMonth">Next month</date-link-or-text>
      →
    </div>
    <div class="date-selector__future--mobile">
      <strong class="date-direction-label">Future →</strong>
      <date-link-or-text :date="nextDay">Next day</date-link-or-text>
      <date-link-or-text :date="nextMonth">Next month</date-link-or-text>
    </div>
  </div>
</template>

<script lang="ts">
import DateLinkOrText from './DateLinkOrText.vue'
import * as DateFns from 'date-fns'
import { computed, ComputedRef, defineComponent, PropType } from 'vue'

type Unit = 'day' | 'month'
type Change = 'add' | 'subtract'

export default defineComponent({
  components: {
    DateLinkOrText,
  },
  props: {
    date: {
      type: Object as PropType<Date>,
      required: true,
    },
    maxDate: {
      type: Object as PropType<Date>,
      required: true,
    },
  },
  setup(props) {
    const formattedDate: ComputedRef<string> = computed(() => {
      return DateFns.format(props.date, 'MMM do yyyy')
    })

    const isFutureDisabled: ComputedRef<boolean> = computed(() => {
      return (
        DateFns.isAfter(props.date, props.maxDate) ||
        DateFns.isSameDay(props.date, props.maxDate)
      )
    })

    const previousDay: ComputedRef<Date> = computed(() => {
      return DateFns.subDays(props.date, 1)
    })

    const nextDay: ComputedRef<Date | null> = computed(() => {
      const date = DateFns.addDays(props.date, 1)
      return DateFns.isAfter(date, props.maxDate) ? null : date
    })

    const previousMonth: ComputedRef<Date> = computed(() => {
      return DateFns.subMonths(props.date, 1)
    })

    const nextMonth: ComputedRef<Date | null> = computed(() => {
      const date = DateFns.addMonths(props.date, 1)
      return DateFns.isAfter(date, props.maxDate) ? null : date
    })

    return {
      formattedDate,
      isFutureDisabled,
      previousDay,
      nextDay,
      previousMonth,
      nextMonth,
    }
  },
})
</script>
