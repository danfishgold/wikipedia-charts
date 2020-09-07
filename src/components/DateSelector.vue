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
import { Vue, Component, Prop } from 'vue-property-decorator'
import DateLinkOrText from './DateLinkOrText.vue'

import * as DateFns from 'date-fns'

type Unit = 'day' | 'month'
type Change = 'add' | 'subtract'

@Component({
  components: { DateLinkOrText },
})
export default class DateSelector extends Vue {
  @Prop({ required: true })
  public date!: Date

  @Prop({ required: true })
  public maxDate!: Date

  get formattedDate() {
    return DateFns.format(this.date, 'MMM do yyyy')
  }

  get isFutureDisabled() {
    return (
      DateFns.isAfter(this.date, this.maxDate) ||
      DateFns.isSameDay(this.date, this.maxDate)
    )
  }

  get previousDay(): Date {
    return DateFns.subDays(this.date, 1)
  }

  get nextDay(): Date | null {
    const date = DateFns.addDays(this.date, 1)
    return DateFns.isAfter(date, this.maxDate) ? null : date
  }

  get previousMonth(): Date {
    return DateFns.subMonths(this.date, 1)
  }

  get nextMonth(): Date | null {
    const date = DateFns.addMonths(this.date, 1)
    return DateFns.isAfter(date, this.maxDate) ? null : date
  }
}
</script>
