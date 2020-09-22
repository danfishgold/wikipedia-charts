import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ArticlePage from '@/views/ArticlePage.vue'
import TalkPage from '@/views/TalkPage.vue'

const routes: Array<RouteRecordRaw> = [
  { name: 'talk', path: '/talk', component: TalkPage },
  { name: 'root', path: '/', component: ArticlePage },
  {
    path: '/:date(\\d{4}-\\d{1,2}-\\d{1,2})',
    name: 'exact-date',
    component: ArticlePage,
  },
  { name: 'fallback', path: '/:catchAll(.*)+', component: ArticlePage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
