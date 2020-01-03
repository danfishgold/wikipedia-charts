<template>
  <div class="date-selector">
    <button @click="emitChange('subtract', 'month')"><<</button>
    <button @click="emitChange('subtract', 'day')"><</button>
    <span>{{ formattedDate }}</span>
    <button @click="emitChange('add', 'day')" :disabled="addDayDisabled">
      >
    </button>
    <button @click="emitChange('add', 'month')" :disabled="addMonthDisabled">
      >>
    </button>
  </div>
</template>

<script>
import * as DateFns from 'date-fns'
import startOfTomorrow from 'date-fns/startOfTomorrow'

export default {
  name: 'DateSelector',
  props: ['date'],
  computed: {
    formattedDate() {
      return DateFns.format(this.date, 'MMM do yyyy')
    },
    addDayDisabled() {
      const futureDate = DateFns.addDays(this.date, 1)
      return DateFns.isAfter(futureDate, DateFns.startOfTomorrow())
    },
    addMonthDisabled() {
      const futureDate = DateFns.addMonths(this.date, 1)
      return DateFns.isAfter(futureDate, DateFns.startOfTomorrow())
    },
  },
  methods: {
    emitChange(addOrSubtract, unit) {
      switch (addOrSubtract) {
        case 'add': {
          return this.$emit('update', this.addUnit(unit))
        }
        case 'subtract': {
          return this.$emit('update', this.subUnit(unit))
        }
      }
    },
    addUnit(unit) {
      switch (unit) {
        case 'day': {
          return DateFns.addDays(this.date, 1)
        }
        case 'month': {
          return DateFns.addMonths(this.date, 1)
        }
      }
    },
    subUnit(unit) {
      switch (unit) {
        case 'day': {
          return DateFns.subDays(this.date, 1)
        }
        case 'month': {
          return DateFns.subMonths(this.date, 1)
        }
      }
    },
  },
}
</script>

<style scoped>
.date-selector {
  width: auto;
  margin: 1rem auto;
  font-variant-numeric: tabular-nums;
}
</style>
