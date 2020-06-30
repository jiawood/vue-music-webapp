// 按需全局引入 vant组件
import Vue from 'vue'
import {Button, List, Cell, Icon} from 'vant'
import {NavBar, Tab, Tabs, Popup, Toast} from 'vant'
import 'vant/lib/index.less'

Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Toast)

//轮播图
import {Swipe, SwipeItem} from 'vant'

Vue.use(Swipe)
Vue.use(SwipeItem)
