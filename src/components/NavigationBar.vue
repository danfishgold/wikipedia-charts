<template>
  <nav>
    <div class="nav__padding"></div>
    <div class="nav__group">
      <div class="nav__group__item">
        <span v-if="selectedTab === 'article'">Article</span>
        <a v-else href="/">Article</a>
      </div>
      <div class="nav__group__item">
        <span v-if="selectedTab === 'talk'">Talk</span>
        <a v-else href="/">Talk</a>
      </div>
    </div>
    <div class="nav__spacer"></div>
    <div class="nav__group">
      <div class="nav__group__item no-mobile">
        <span>Read</span>
      </div>
      <div class="nav__group__item">
        <a href="https://github.com/danfishgold/wikipedia-charts">Edit</a>
      </div>
      <div class="nav__group__item no-mobile">
        <a href="https://github.com/danfishgold/wikipedia-charts/commits/main"
          >View History</a
        >
      </div>
    </div>
    <div class="nav__padding"></div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NavigationBar extends Vue {
  @Prop({ required: true })
  selectedTab!: 'article' | 'talk'
}
</script>
