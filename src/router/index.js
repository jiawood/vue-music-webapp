import Vue from 'vue'
import vueRouter from 'vue-router'
import VueRouter from 'vue-router'

const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const menu = () => import('views/Menu/Menu.vue')
const profile = () => import('views/Profile/Profile.vue')
const find = () => import('views/Find/Find.vue')
const cloud_village = () => import('views/CloudVillage/CloudVillage.vue')
const video = () => import('views/Video/Video.vue')
const search = () => import('views/Search/Search.vue')

const routes = [
  {
    path: '',
    redirect: '/find'
  },
  {
    path: '/find',
    component: find
  },
  {
    path: '/menu',
    component: menu
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
  },
  {
    path: '/search',
    component: search
  }
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

export default router
