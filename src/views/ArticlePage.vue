<template>
  <main>
    <h1>Wikipedia Charts</h1>
    <p class="subtitle">Indirectly from Wikipedia, the free encyclopedia</p>
    <p>
      <strong>Wikipedia Charts</strong> is a
      <a href="https://en.wikipedia.org/wiki/Website">website</a> that shows the
      top 100 visited pages on the
      <a href="https://en.wikipedia.org/wiki/English_language">English</a>
      version of
      <a href="https://en.wikipedia.org/wiki/Wikipedia">Wikipedia</a> on any
      given day.
    </p>
    <p>
      Each entry in the list displays the page’s rank, the difference between
      it’s ranking on that day compared to the day before (in the “Change”
      column), and the number of times that page was viewed.
    </p>
    <p>
      A page is listed in
      <a href="https://en.wikipedia.org/wiki/Bold">bold</a> and marked with
      three arrows (⬆︎⬆︎⬆︎) when it wasn’t in the top 1,000 pages on Wikipedia
      on the day before, meaning it became very
      <span nowrap
        >popular<sup
          >[<em
            ><a href="https://en.wikipedia.org/wiki/Wikipedia:Citation_needed"
              >citation needed</a
            ></em
          >]</sup
        ></span
      >
      very abruptly. This usually means it's related to a major news event or
      it’s a new
      <a href="https://en.wikipedia.org/wiki/Netflix">Netflix</a> show.
    </p>
    <error-message
      v-if="articles.status === 'error'"
      :date="date"
    ></error-message>
    <div class="date-selector-and-leaderboard">
      <date-selector
        v-if="date"
        :date="date"
        :max-date="maxDate"
      ></date-selector>
      <leaderboard :articles="articles"></leaderboard>
    </div>
    <div id="spacer"></div>
  </main>
</template>

<script lang="ts">
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'

import DateSelector from '@/components/DateSelector.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import * as wikipedia from '@/wikipedia'
import { Article } from '@/wikipedia'
import * as DateFns from 'date-fns'
import { RemoteData } from '@/remoteData'
import { defineComponent, onMounted, ref, Ref, watch } from 'vue'

export default defineComponent({
  components: {
    DateSelector,
    ErrorMessage,
    Leaderboard,
  },
  setup() {
    const date: Ref<Date | null> = ref(null)
    const maxDate: Ref<Date> = ref(DateFns.startOfToday())
    const cache: Ref<Cache | null> = ref(null)
    const articles: Ref<RemoteData<Article[]>> = ref({
      status: 'loading',
    } as const)

    const route = useRoute()
    const router = useRouter()

    const onRouteChange = async (val: RouteLocationNormalized) => {
      const newDate = parseDateFromRoute(val, maxDate.value)
      if (!newDate) {
        rerouteToMaxDate()
        return
      }
      await updateDate(newDate)
    }

    const parseDateFromRoute = (
      route: RouteLocationNormalized,
      maxDate: Date | null
    ): Date | null => {
      if (route.fullPath === '/') {
        return maxDate
      } else {
        const newDate = DateFns.startOfDay(
          new Date(route.params.date as string)
        )
        if (
          isNaN(newDate.getDate()) ||
          (maxDate && DateFns.isAfter(newDate, maxDate))
        ) {
          return null
        } else {
          return newDate
        }
      }
    }
    const rerouteToMaxDate = () => {
      const formattedDate = DateFns.format(maxDate.value, 'yyyy-MM-dd')
      router.replace({
        name: 'exact-date',
        params: { date: formattedDate },
      })
    }

    const updateDate = async (newDate: Date) => {
      date.value = newDate
      const setToLoading = setTimeout(() => {
        articles.value = {
          status: 'loading',
        }
      }, 75)

      try {
        const data = await wikipedia.getResultsForDate(newDate, cache.value)
        // to avoid race conditions where the date is changed before the request
        // for the previous date is resolved
        if (date.value === newDate) {
          clearTimeout(setToLoading)
          articles.value = {
            data,
            status: 'okay',
          }
        }
      } catch (e) {
        clearTimeout(setToLoading)
        articles.value = { status: 'error' }
      }
    }

    watch(
      () => [route.fullPath, route.params],
      async () => {
        if (router.resolve({ name: 'talk' }).href === route.fullPath) {
          return
        }
        await onRouteChange(route)
      }
    )

    onMounted(async () => {
      date.value = parseDateFromRoute(route, null)
      cache.value =
        window.caches && (await window.caches.open('wikipedia-analytics'))
      maxDate.value = await wikipedia.maxDate(cache.value)
      const newDate = parseDateFromRoute(route, maxDate.value)
      if (!newDate) {
        rerouteToMaxDate()
        return
      }
      await updateDate(newDate)
    })

    return {
      date,
      maxDate,
      articles,
    }
  },
})
</script>
