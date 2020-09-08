<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
    <footer>
      <div class="footer__content">
        <p>This website was last edited on September 8th, 2020.</p>
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

import NavigationBar from './components/NavigationBar.vue'
import ArticlePage from './components/ArticlePage.vue'
import TalkPage from './components/TalkPage.vue'

@Component({
  components: {
    NavigationBar,
    ArticlePage,
    TalkPage,
  },
})
export default class App extends Vue {}
</script>
