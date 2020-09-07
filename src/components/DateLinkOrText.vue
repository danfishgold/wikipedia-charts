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
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DateLinkOrText extends Vue {
  @Prop({ required: true })
  date!: Date | null

  get formattedDate(): string {
    return DateFns.format(this.date!, 'yyyy-MM-dd')
  }
}
</script>
