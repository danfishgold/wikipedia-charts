<template>
  <div id="leaderboard-container">
    <p v-if="articles.status === 'error'">
      {{ errorMessage }}
    </p>
    <table v-else>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Change</th>
          <th>Page</th>
          <th>Page Views</th>
        </tr>
      </thead>
      <tbody v-if="articles.status === 'okay'">
        <leaderboard-row
          v-for="(article, index) in articles.data"
          :key="index"
          :article="article"
        />
      </tbody>
      <tbody v-else>
        <tr v-for="(_, index) in new Array(100)" :key="index">
          <td>{{ index + 1 }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import LeaderboardRow from './LeaderboardRow.vue'
import * as DateFns from 'date-fns'
import startOfYesterday from 'date-fns/startOfYesterday'
import { Article } from '../wikipedia'
import { RemoteData } from '../remoteData'

@Component({ components: { LeaderboardRow } })
export default class Leaderboard extends Vue {
  @Prop({ required: true })
  public articles!: RemoteData<Array<Article>>

  @Prop({ required: true })
  public date!: Date

  get errorMessage() {
    if (DateFns.isAfter(this.date, startOfYesterday())) {
      return `
          ❌ Wikipedia doesn't give access to the top pages before the end of the day.
          Past dates should be fine though.
        `
    } else if (DateFns.isBefore(this.date, new Date('2015-07-02'))) {
      return `
          ❌ Unfortunately Wikipedia doesn't have this information for dates before July 2nd, 2015.
        `
    } else {
      return `
          ❌ There was a problem. This might be because the page hit Wikipedia's
          rate limit. Try again later.
        `
    }
  }
}
</script>
