<template>
  <main>
    <h1>Talk:Wikipedia Charts</h1>
    <p class="subtitle">Not from Wikipedia, the free encyclopedia</p>
    <div v-html="content"></div>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
// import VueMarkdown from 'vue-markdown'
import MarkdownIt from 'markdown-it'
import source from '@/assets/talk.md'

export default defineComponent({
  setup() {
    const md = new MarkdownIt({
      html: true,
      typographer: true,
    })
    const content = md.render(source)
    return { content }
  },
})
</script>
