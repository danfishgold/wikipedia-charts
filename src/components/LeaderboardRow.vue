<template>
  <tr :class="rowClass">
    <td>{{ new Intl.NumberFormat().format(article.rank) }}</td>
    <td>{{ changeIndicator }}</td>
    <td v-if="article.title">
      <a :href="`https://en.wikipedia.com/wiki/${article.title}`">{{
        this.normalizedTitle
      }}</a>
      {{ this.indicator }}
    </td>
    <td v-else></td>
    <td>{{ new Intl.NumberFormat().format(article.views) }}</td>
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

  get changeFromYesterday(): number | null {
    if (!this.article.rankOnPreviousDay) {
      return null
    }
    return this.article.rank - this.article.rankOnPreviousDay
  }

  get rowClass(): 'same' | 'up' | 'down' | 'big-up' | 'huge-up' {
    if (this.changeFromYesterday === null) {
      return 'huge-up'
    }
    if (this.changeFromYesterday > 0) {
      return `down`
    } else if (this.changeFromYesterday < -100) {
      return `big-up`
    } else if (this.changeFromYesterday < 0) {
      return `up`
    } else {
      return 'same'
    }
  }

  get changeIndicator(): string {
    switch (this.rowClass) {
      case 'huge-up': {
        return '⬆︎⬆︎⬆︎'
      }
      case 'big-up': {
        return `⬆︎${-this.changeFromYesterday ?? 0}`
      }
      case 'up': {
        return `⬆︎${-this.changeFromYesterday ?? 0}`
      }
      case 'down': {
        return `⬇︎${this.changeFromYesterday ?? 0}`
      }
      case 'same': {
        return '–'
      }
    }
  }
}
</script>
