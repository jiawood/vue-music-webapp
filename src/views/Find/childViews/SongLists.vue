// 歌单广场
<template>
  <div class="song-lists">
    <div class="header">
      <div class="icon">
        <img :src="pImg" alt="" />
      </div>
      <div class="title">
        <span>歌单广场</span>
      </div>
    </div>
    <div class="swiper"></div>
    <div class="content">
      <div class="item" v-for="(item, index) in allSongList" :key="index">
        <song-list-item :songItem="item"></song-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import SongListItem from 'components/find/SongListItem'
import {recommendListNo} from 'api/find'

export default {
  name: 'SongList',
  components: {
    SongListItem
  },
  data() {
    return {
      pImg: require('assets/icons/left-arrow.svg'),
      allSongList: []
    }
  },
  created() {
    recommendListNo().then(res => {
      this.allSongList = res.data.result
    })
  }
}
</script>

<style lang="scss" scoped>
.song-lists {
  width: 360px;
  padding: 0 15px;
  .header {
    height: 30px;
    .icon {
      float: left;
      left: 0;
      top: 0;
      img {
        height: 30px;
        width: 30px;
      }
    }
    .title {
      float: left;
      left: 0;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
