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
    <date-selector
      :date="date"
      :max-date="maxDate"
      @update="onDateSet($event, 'manually-changed')"
    ></date-selector>
    <leaderboard :articles="articles" :date="date"></leaderboard>
    <div id="spacer"></div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

import DateSelector from './DateSelector.vue'
import Leaderboard from './Leaderboard.vue'
import * as wikipedia from '../wikipedia'
import { Article } from '../wikipedia'
import * as DateFns from 'date-fns'
import { RemoteData } from '../remoteData'

type DateChangeReason = 'first-run' | 'manually-changed' | 'url-changed'

@Component({
  components: {
    DateSelector,
    Leaderboard,
  },
})
export default class ArticlePage extends Vue {
  date: Date = DateFns.subDays(DateFns.startOfDay(new Date()), 1)
  maxDate: Date = this.date
  cache: Cache | null = null
  articles: RemoteData<Array<Article>> = { status: 'loading' }

  async created() {
    this.cache =
      window.caches && (await window.caches.open('wikipedia-analytics'))
    await this.onDateSet(this.date, 'first-run')
  }

  @Watch('$route')
  onRouteChange(val: Route, oldVal: Route) {
    if (val.fullPath === '/') {
      this.onDateSet(this.maxDate, 'url-changed')
    } else {
      const newDate = new Date(val.params.date)
      if (isNaN(newDate.getDate()) || DateFns.isAfter(newDate, this.maxDate)) {
        const formattedDate = DateFns.format(this.maxDate, 'yyyy-MM-dd')
        this.$router.replace(`/date/${formattedDate}`)
      } else {
        this.onDateSet(newDate, 'url-changed')
      }
    }
  }

  async onDateSet(newDate: Date, changeReason: DateChangeReason) {
    this.date = newDate

    if (changeReason === 'manually-changed') {
      const formattedDate = DateFns.format(newDate, 'yyyy-MM-dd')
      this.$router.push(`/date/${formattedDate}`)
    }

    if (changeReason === 'first-run') {
      this.maxDate = newDate
    }

    this.articles = {
      status: 'loading',
    }

    try {
      const data = await wikipedia.getResultsForDate(newDate, this.cache)
      // to avoid race conditions where the date is changed before the request
      // for the previous date is resolved
      if (this.date === newDate) {
        this.articles = {
          data,
          status: 'okay',
        }
      }
    } catch (e) {
      if (changeReason === 'first-run') {
        await this.onDateSet(DateFns.subDays(newDate, 1), 'first-run')
      } else {
        this.articles = { status: 'error' }
      }
    }
  }
}
</script>
