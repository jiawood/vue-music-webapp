<template>
  <div id="find">
    <find-swiper :banner="banner"></find-swiper>
    <find-lists />
    <find-recommend
      :recommendList="recommendList"
      :recommendTop="recommendTop"
    ></find-recommend>
    <find-recommend-music :recommendMusicData="recommendMusicData" top="大家都在听"/>
    <find-recommend-music :recommendMusicData="recommendMusicData2" top="今天的音乐，请查收"/>
    <go-top />
  </div>
</template>

<script>
import FindSwiper from './childFinds/FindSwiper'
import FindLists from './childFinds/FindLists'
import FindRecommend from 'components/find/FindRecommend'
import FindRecommendMusic from 'components/find/FindRecommendMusic'
import GoTop from 'components/GoTop'

import {getFindBanner, getRecommend, recommendMusicData, recommendMusicData2} from 'api/find'
export default {
  name: 'Find',
  components: {
    FindSwiper,
    FindLists,
    FindRecommend,
    FindRecommendMusic,
    GoTop
  },
  data() {
    return {
      banner: [],
      recommendList: [],
      recommendMusicData: [],
      recommendMusicData2: [],
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
      // debugger
      this.recommendMusicData = res.data.playlist.tracks
    })
    //推荐歌曲2
      recommendMusicData2().then(res => {
      this.recommendMusicData2 = res.data.playlist.tracks
    })
  }
}
</script>

<style lang="scss" scoped></style>
