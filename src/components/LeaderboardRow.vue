<template>
  <tr :class="rowClass">
    <td>{{ new Intl.NumberFormat().format(article.rank) }}</td>
    <td>{{ changeIndicator }}</td>
    <td v-if="article.title">
      <a :href="link">{{ normalizedTitle }}</a>
    </td>
    <td v-else></td>
    <td>{{ new Intl.NumberFormat().format(article.views) }}</td>
  </tr>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue'
import { Article } from '../wikipedia'

type RankChange = 'same' | 'up' | 'down' | 'big-up' | 'huge-up'

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(props) {
    const normalizedTitle: ComputedRef<string> = computed(() => {
      return props.article.title === 'Special:Search'
        ? 'Search'
        : props.article.title.replace(/_/g, ' ') ?? ''
    })

    const link: ComputedRef<string> = computed(() => {
      return `https://en.wikipedia.com/wiki/${props.article.title}`
    })

    const changeFromYesterday: ComputedRef<number | null> = computed(() => {
      if (!props.article.rankOnPreviousDay) {
        return null
      }
      return props.article.rank - props.article.rankOnPreviousDay
    })

    const rowClass: ComputedRef<RankChange> = computed(() => {
      if (changeFromYesterday.value === null) {
        return 'huge-up'
      }
      if (changeFromYesterday.value > 0) {
        return `down`
      } else if (changeFromYesterday.value < -100) {
        return `big-up`
      } else if (changeFromYesterday.value < 0) {
        return `up`
      } else {
        return 'same'
      }
    })

    const changeIndicator: ComputedRef<string> = computed(() => {
      switch (rowClass.value) {
        case 'huge-up': {
          return '⬆︎⬆︎⬆︎'
        }
        case 'big-up': {
          return `⬆︎${-(changeFromYesterday.value ?? 0)}`
        }
        case 'up': {
          return `⬆︎${-(changeFromYesterday.value ?? 0)}`
        }
        case 'down': {
          return `⬇︎${changeFromYesterday.value ?? 0}`
        }
        case 'same': {
          return '–'
        }
      }
    })

    return {
      normalizedTitle,
      link,
      changeFromYesterday,
      rowClass,
      changeIndicator,
    }
  },
})
</script>
