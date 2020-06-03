<template>
  <div id="find">
    <find-swiper :banner="banner"></find-swiper>
    <find-lists />
  </div>
</template>

<script>
import FindSwiper from './childFinds/FindSwiper'
import FindLists from './childFinds/FindLists'

import {getFindBanner} from 'api/find'
export default {
  name: 'Find',
  components: {
    FindSwiper,
    FindLists
  },
  data() {
    return {
      banner: []
    }
  },
  created() {
    getFindBanner().then(res => {
      this.banner = res.data.banners
    })
  }
}
</script>

<style lang="scss" scoped></style>
