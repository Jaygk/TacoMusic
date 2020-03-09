import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = () => import('views/recommend/Recommend')
const Singer = () => import('views/singer/Singer')
const Rank = () => import('views/rank/Rank')
const Search = () => import('views/search/Search')
const SingerDetail = () => import('views/singerDetail/SingerDetail')
const RecommendDetail = () => import('views/recommendDetail/RecommendDetail')
const TopList = () => import('views/topList/TopList')
const SearchResult = () => import('views/searchResult/SearchResult')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: RecommendDetail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/singerDetail/:id',
    component: SingerDetail
  },
  {
    path: '/searchResult',
    name: 'result',
    component: SearchResult
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
