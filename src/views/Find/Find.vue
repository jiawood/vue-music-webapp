<template>
  <div id="find">
    <find-swiper :banner="banner"></find-swiper>
    <find-lists />
    <find-recommend
      :recommendList="recommendList"
      :recommendTop="recommendTop"
    ></find-recommend>
    <find-recommend-music :recommendMusicData="recommendMusicData" />
  </div>
</template>

<script>
import FindSwiper from './childFinds/FindSwiper'
import FindLists from './childFinds/FindLists'
import FindRecommend from 'components/find/FindRecommend'
import FindRecommendMusic from 'components/find/FindRecommendMusic'

import {getFindBanner, getRecommend, recommendMusicData} from 'api/find'
export default {
  name: 'Find',
  components: {
    FindSwiper,
    FindLists,
    FindRecommend,
    FindRecommendMusic
  },
  data() {
    return {
      banner: [],
      recommendList: [],
      recommendMusicData: [],
      recommendTop: '懂你的精选歌单'
    }
  },
  created() {
    //头部轮播图
    getFindBanner().then(res => {
      this.banner = res.data.banners
    })
    //懂你的精选歌单
    getRecommend().then(res => {
      this.recommendList = res.data.playlists
    })
    //推荐歌曲
    recommendMusicData().then(res => {
      this.recommendMusicData = res.data.result
    })
  }
}
</script>

<style lang="scss" scoped></style>
