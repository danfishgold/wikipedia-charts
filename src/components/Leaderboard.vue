<template>
  <div id="leaderboard-container">
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Page</th>
          <th>Page Views</th>
        </tr>
      </thead>
      <tbody v-if="articles.status === 'okay' || articles.status === 'loading'">
        <leaderboard-row
          v-for="(article, index) in articles.articles"
          :key="index"
          :article="article"
        />
      </tbody>
    </table>
    <p v-if="articles.status === 'loading'"></p>
    <p v-if="articles.status === 'error'">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import LeaderboardRow from './LeaderboardRow.vue'
import * as DateFns from 'date-fns'
import startOfYesterday from 'date-fns/startOfYesterday'

export default {
  components: {
    LeaderboardRow,
  },
  name: 'Leaderboard',
  props: ['articles'],
  computed: {
    errorMessage() {
      if (DateFns.isAfter(this.articles.date, startOfYesterday())) {
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
    },
  },
}
</script>

<style scoped>
thead {
  font-weight: bold;
}

thead th:nth-child(1) {
  text-align: right;
}
thead th:nth-child(2) {
  text-align: left;
  width: 100%;
}
thead th:nth-child(3) {
  text-align: right;
}

table {
  border-spacing: 0.5rem;
}

#leaderboard-container p {
  margin: 0.5rem;
}
</style>
