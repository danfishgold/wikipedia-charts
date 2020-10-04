<template>
  <div id="leaderboard-container">
    <table v-if="articles.status !== 'error'">
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
import LeaderboardRow from './LeaderboardRow.vue'
import { Article } from '../wikipedia'
import { RemoteData } from '../remoteData'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  components: {
    LeaderboardRow,
  },
  props: {
    articles: {
      type: Object as PropType<RemoteData<Article[]>>,
      required: true,
    },
  },
})
</script>
