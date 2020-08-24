import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'assets/iconfont/iconfont.css'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
//引入全局样式
// import 'src/assets/css/inde x.scss'

//全局引入按需引入UI库 vant
import 'plugins/vant'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper /* { default options with global component } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
