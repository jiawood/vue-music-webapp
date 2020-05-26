<template>
  <div id="find">
    <find-swiper :banner="banner"></find-swiper>
  </div>
</template>

<script>
import FindSwiper from './childFinds/FindSwiper'

import {getFindBanner} from 'api/find'
export default {
  name: 'Find',
  components: {
    FindSwiper
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
