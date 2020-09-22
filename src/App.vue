<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
    <feet></feet>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import Feet from '@/components/Feet.vue'

export default defineComponent({
  components: {
    NavigationBar,
    Feet,
  },
})
</script>
