<template>
  <div id="app">
    <navigation-bar :selected-tab="selectedTab"></navigation-bar>
    <main>
      <h1>Wikipedia Charts</h1>
      <p class="subtitle">Indirectly from Wikipedia, the free encyclopedia</p>
      <p>
        <strong>Wikipedia Charts</strong> is a
        <a href="https://en.wikipedia.org/wiki/Website">website</a> that shows
        the top 100 visited pages on the
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
        @update="onDateSet($event, false)"
      ></date-selector>
      <leaderboard :articles="articles" :date="date"></leaderboard>
      <div id="spacer"></div>
    </main>
    <footer>
      <div class="footer__content">
        <p>This website was last edited on September 6th, 2020.</p>
        <p>
          If this were a real website with more than one and a half pages it
          would probably have enough content to put in this footer, but alas,
          that is not the case.
        </p>
        <p>
          Honestly, this footer is here just because the bottom of the page
          looks weird without it, but also, I didn't want to do what Wikipedia
          does in their footer (stuff about terms of use and licensing) so here
          we are.
        </p>
        <p>
          <a href="https://github.com/danfishgold/wikipedia-charts">Made</a>
          with ♥︎ by <a href="https://danfishgold.com">Dan Fishgold.</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import DateSelector from './components/DateSelector.vue'
import NavigationBar from './components/NavigationBar.vue'
import Leaderboard from './components/Leaderboard.vue'
import * as wikipedia from './wikipedia'
import { Article } from './wikipedia'
import * as DateFns from 'date-fns'
import { RemoteData } from './remoteData'

@Component({
  components: {
    DateSelector,
    Leaderboard,
    NavigationBar,
  },
})
export default class App extends Vue {
  date: Date = DateFns.subDays(new Date(), 1)
  maxDate: Date = this.date
  cache: Cache | null = null
  articles: RemoteData<Array<Article>> = { status: 'loading' }
  selectedTab = 'article'

  async created() {
    this.cache =
      window.caches && (await window.caches.open('wikipedia-analytics'))
    await this.onDateSet(this.date, true)
  }

  async onDateSet(newDate: Date, firstTime: boolean) {
    this.date = newDate
    if (firstTime) {
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
      if (firstTime) {
        await this.onDateSet(DateFns.subDays(newDate, 1), firstTime)
      } else {
        this.articles = { status: 'error' }
      }
    }
  }
}
</script>
