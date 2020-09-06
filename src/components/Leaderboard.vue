<template>
  <div id="leaderboard-container">
    <error-message
      v-if="articles.status === 'error'"
      :date="date"
    ></error-message>
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
import ErrorMessage from './ErrorMessage.vue'
import { Article } from '../wikipedia'
import { RemoteData } from '../remoteData'

@Component({ components: { LeaderboardRow, ErrorMessage } })
export default class Leaderboard extends Vue {
  @Prop({ required: true })
  public articles!: RemoteData<Array<Article>>

  @Prop({ required: true })
  public date!: Date
}
</script>
