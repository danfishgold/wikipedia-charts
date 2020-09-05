<template>
  <div id="leaderboard-container">
    <p v-if="articles.status === 'error'">
      {{ errorMessage }}
    </p>
    <table v-else>
      <thead>
        <tr>
          <th>Rank</th>
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
          ❌ Wikipedia doesn't give access to the most popular pages
          today before the end of the day (and sometimes yesterday's too).
          Past dates should be fine though.
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

<style lang="scss">
table {
  border-spacing: 0.5rem;

  thead {
    font-weight: bold;

    th {
      &:nth-child(1) {
        text-align: right;
      }
      &:nth-child(2) {
        text-align: left;
        width: 100%;
      }
      &:nth-child(3) {
        text-align: right;
      }
    }
  }

  td {
    &:nth-child(1) {
      text-align: right;
    }

    &:nth-child(3) {
      text-align: right;
    }
  }
}

#leaderboard-container p {
  margin: 0.5rem;
}
</style>
