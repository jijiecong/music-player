import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/index2'
import Singer from 'components/singer'
import Rank from 'components/rank'
import Search from 'components/search/index2'
import SingerDetail from 'components/singer/detail'
import RecommendDetail from 'components/recommend/detail'
import RankDetail from 'components/rank/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
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
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'singerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          name: 'singerDetail',
          component: SingerDetail
        }
      ]
    }
  ]
})
