<template>
  <nav>
    <div class="nav__padding"></div>
    <div class="nav__group">
      <div class="nav__group__item">
        <router-link
          :to="{ name: 'root' }"
          exact
          :class="{ 'router-link-active': !isOnTalk }"
          >Article</router-link
        >
      </div>
      <div class="nav__group__item">
        <router-link :to="{ name: 'talk' }">Talk</router-link>
      </div>
    </div>
    <div class="nav__spacer"></div>
    <div class="nav__group">
      <div class="nav__group__item no-mobile">
        <router-link :to="route.fullPath">Read</router-link>
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
import { defineComponent, ComputedRef, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isOnTalk: ComputedRef<boolean> = computed(() => {
      return route.fullPath === router.resolve({ name: 'talk' }).href
    })

    return { isOnTalk, route }
  },
})
</script>
