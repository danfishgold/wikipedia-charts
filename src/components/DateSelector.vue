<template>
  <div class="date-selector">
    <button @click="emitChange('subtract', 'month')">&lt;&lt;</button>
    <button @click="emitChange('subtract', 'day')">&lt;</button>
    <span>{{ formattedDate }}</span>
    <button @click="emitChange('add', 'day')" :disabled="isFutureDisabled">
      &gt;
    </button>
    <button @click="emitChange('add', 'month')" :disabled="isFutureDisabled">
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
  public date!: Date | null

  @Prop({ required: true })
  public maxDate!: Date

  get formattedDate() {
    if (!this.date) {
      return ''
    }
    return DateFns.format(this.date, 'MMM do yyyy')
  }

  get isFutureDisabled() {
    if (!this.date) {
      return true
    }
    return (
      DateFns.isAfter(this.date, this.maxDate) ||
      DateFns.isSameDay(this.date, this.maxDate)
    )
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
    if (!this.date) {
      return
    }
    const addFunction = unit === 'day' ? DateFns.addDays : DateFns.addMonths
    const newDate = addFunction(this.date, 1)
    if (DateFns.isAfter(newDate, this.maxDate)) {
      return this.maxDate
    } else {
      return newDate
    }
  }

  subUnit(unit: Unit) {
    if (!this.date) {
      return
    }
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
