<template>
  <div class="date-selector">
    <button @click="emitChange('subtract', 'month')">&lt;&lt;</button>
    <button @click="emitChange('subtract', 'day')">&lt;</button>
    <span>{{ formattedDate }}</span>
    <button @click="emitChange('add', 'day')" :disabled="addDayDisabled">
      &gt;
    </button>
    <button @click="emitChange('add', 'month')" :disabled="addMonthDisabled">
      &gt;&gt;
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import * as DateFns from 'date-fns'
import startOfTomorrow from 'date-fns/startOfTomorrow'

type Unit = 'day' | 'month'
type Change = 'add' | 'subtract'

@Component
export default class DateSelector extends Vue {
  @Prop({ required: true })
  public date!: Date

  get formattedDate() {
    return DateFns.format(this.date, 'MMM do yyyy')
  }

  get addDayDisabled() {
    const futureDate = DateFns.addDays(this.date, 1)
    return DateFns.isAfter(futureDate, DateFns.startOfTomorrow())
  }

  get addMonthDisabled() {
    const futureDate = DateFns.addMonths(this.date, 1)
    return DateFns.isAfter(futureDate, DateFns.startOfTomorrow())
  }

  emitChange(addOrSubtract: Change, unit: Unit) {
    switch (addOrSubtract) {
      case 'add': {
        return this.$emit('update', this.addUnit(unit))
      }
      case 'subtract': {
        return this.$emit('update', this.subUnit(unit))
      }
    }
  }

  addUnit(unit: Unit) {
    switch (unit) {
      case 'day': {
        return DateFns.addDays(this.date, 1)
      }
      case 'month': {
        return DateFns.addMonths(this.date, 1)
      }
    }
  }

  subUnit(unit: Unit) {
    switch (unit) {
      case 'day': {
        return DateFns.subDays(this.date, 1)
      }
      case 'month': {
        return DateFns.subMonths(this.date, 1)
      }
    }
  }
}
</script>
