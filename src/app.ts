import 'regenerator-runtime/runtime'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TalkPage from './components/TalkPage.vue'
import ArticlePage from './components/ArticlePage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: ArticlePage },
  {
    path: '/:date(\\d{4}-\\d{1,2}-\\d{1,2})',
    name: 'exact-date',
    component: ArticlePage,
  },
  { path: '/talk', component: TalkPage },
  { path: '*', component: ArticlePage },
]

const router = new VueRouter({ routes, mode: 'history' })

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
})
