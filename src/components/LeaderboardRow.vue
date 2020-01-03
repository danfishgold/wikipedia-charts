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

<script>
export default {
  name: 'LeaderboardRow',
  props: ['article'],
  computed: {
    normalizedTitle() {
      return this.article.title === 'Special:Search'
        ? 'Search'
        : this.article.title.replace(/_/g, ' ')
    },
    fires() {
      if (!this.article.rankOnPreviousDay) {
        return '🔥🔥'
      } else if (this.article.rankOnPreviousDay - this.article.rank > 100) {
        return '🔥'
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped>
td:nth-child(1) {
  text-align: right;
}

td:nth-child(3) {
  text-align: right;
}
</style>
