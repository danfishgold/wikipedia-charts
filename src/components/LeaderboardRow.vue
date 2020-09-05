<template>
  <tr>
    <td>{{ article.rank }}</td>
    <td v-if="article.title">
      <a :href="`https://en.wikipedia.com/wiki/${article.title}`">
        {{ this.normalizedTitle }}
      </a>
      {{ this.fires }}
    </td>
    <td v-else></td>
    <td>{{ article.views }}</td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Article } from '../wikipedia'

@Component
export default class LeaderboardRow extends Vue {
  @Prop({ required: true })
  public article!: Article

  get normalizedTitle() {
    return this.article.title === 'Special:Search'
      ? 'Search'
      : this.article.title.replace(/_/g, ' ') ?? ''
  }

  get fires() {
    if (!this.article.rankOnPreviousDay) {
      return '🔥🔥'
    } else if (this.article.rankOnPreviousDay - this.article.rank > 100) {
      return '🔥'
    } else {
      return ''
    }
  }
}
</script>
