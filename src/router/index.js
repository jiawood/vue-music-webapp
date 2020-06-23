import Vue from 'vue'
import vueRouter from 'vue-router'
import VueRouter from 'vue-router'

const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const home = () => import('views/Home.vue')

const menu = () => import('views/Menu/Menu.vue')
const profile = () => import('views/Profile/Profile.vue')
const find = () => import('views/Find/Find.vue')
const cloud_village = () => import('views/CloudVillage/CloudVillage.vue')
const video = () => import('views/Video/Video.vue')
const search = () => import('views/Search/Search.vue')

//find 下面的子页面
const recommend = () => import('views/Find/childViews/Recommend.vue') //每日推荐
const song_lists = () => import('views/Find/childViews/SongLists.vue') //歌单
const rank = () => import('views/Find/childViews/Rank.vue') //排行榜
const radio = () => import('views/Find/childViews/Radio.vue') //电台
const live = () => import('views/Find/childViews/Live.vue') // 直播
const album = () => import('views/Find/childViews/Album.vue') //数字专辑

const routes = [
  {
    path: '',
    component: home,
    redirect: '/home'
  },

  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/find',
        component: find
      },
      {
        path: '/profile',
        component: profile
      },
      {
        path: '/cloud_village',
        component: cloud_village
      },
      {
        path: '/video',
        component: video
      }
    ]
  },

  {
    path: '/menu',
    component: menu
  },

  {
    path: '/search',
    component: search
  },

  {
    path: '/recommend',
    component: recommend
  },
  {
    path: '/song_lists',
    component: song_lists
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/radio',
    component: radio
  },
  {
    path: '/live',
    component: live
  },
  {
    path: '/album',
    component: album
  }
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

export default router
