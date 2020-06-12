<template>
  <div id="find">
    <find-swiper :banner="banner"></find-swiper>
    <find-lists />
    <find-recommend
      :recommendList="recommendList"
      :recommendTop="recommendTop"
    ></find-recommend>
  </div>
</template>

<script>
import FindSwiper from './childFinds/FindSwiper'
import FindLists from './childFinds/FindLists'
import FindRecommend from 'components/FindRecommend'

import {getFindBanner, getRecommend} from 'api/find'
export default {
  name: 'Find',
  components: {
    FindSwiper,
    FindLists,
    FindRecommend
  },
  data() {
    return {
      banner: [],
      recommendList: [],
      recommendTop: '懂你的精选歌单'
    }
  },
  created() {
    getFindBanner().then(res => {
      this.banner = res.data.banners
    })
    getRecommend().then(res => {
      this.recommendList = res.data.playlists
    })
  }
}
</script>

<style lang="scss" scoped></style>
