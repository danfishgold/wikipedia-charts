<template>
  <div id="app">
    <h1>Wikipedia Leaderboard</h1>
    <p>
      These are the top 100 visited pages on the English version of Wikipedia
      for a given day.
    </p>
    <p>
      🔥 means the pagerose up the charts by at least 100 compared to the
      previous day.
    </p>
    <p>
      🔥🔥 means the ranking for that page on the previous day was at least
      1000.
    </p>
    <date-selector
      :date="date"
      @update="onDateSet($event, false)"
    ></date-selector>
    <leaderboard :articles="articles" :date="date"></leaderboard>
    <div id="spacer"></div>
    <footer>
      <p>
        Made with ♥︎ by
        <a href="https://danfishgold.com">Dan Fishgold</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import DateSelector from './components/DateSelector.vue'
import Leaderboard from './components/Leaderboard.vue'
import * as wikipedia from './wikipedia'
import { Article } from './wikipedia'
import * as DateFns from 'date-fns'
import { RemoteData } from './remoteData'

@Component({
  components: {
    DateSelector,
    Leaderboard,
  },
})
export default class App extends Vue {
  date: Date = DateFns.subDays(new Date(), 1)
  cache: Cache | null = null
  articles: RemoteData<Array<Article>> = { status: 'loading' }

  async created() {
    this.cache =
      window.caches && (await window.caches.open('wikipedia-analytics'))
    await this.onDateSet(this.date, true)
  }

  async onDateSet(newDate: Date, firstTime: boolean) {
    this.date = newDate
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
      if (firstTime) {
        await this.onDateSet(DateFns.subDays(newDate, 1), firstTime)
      } else {
        this.articles = { status: 'error' }
      }
    }
  }
}
</script>
