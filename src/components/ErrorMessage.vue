<template>
  <div>
    <p v-if="errorType === 'no-information-for-today'">
      ❌ Wikipedia doesn't give access to the top pages before the end of the
      day. Past dates should be fine though.
    </p>
    <p v-else-if="errorType === 'no-information-before-2015'">
      ❌ Unfortunately Wikipedia doesn't have this information for dates before
      <router-link :to="{ name: 'exact-date', params: { date: '2015-07-02' } }"
        >July 2nd, 2015</router-link
      >.
    </p>
    <p v-else-if="errorType === 'general-problem'">
      ❌ There was a problem. This might be because the page hit Wikipedia's
      rate limit. Try again later.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import * as DateFns from 'date-fns'
import startOfYesterday from 'date-fns/startOfYesterday'

type ErrorType =
  | 'no-information-for-today'
  | 'no-information-before-2015'
  | 'general-problem'

@Component
export default class extends Vue {
  @Prop({ required: true })
  date!: Date

  get errorType(): ErrorType {
    if (DateFns.isAfter(this.date, startOfYesterday())) {
      return 'no-information-for-today'
    } else if (DateFns.isBefore(this.date, new Date('2015-07-02'))) {
      return 'no-information-before-2015'
    } else {
      return 'general-problem'
    }
  }
}
</script>
