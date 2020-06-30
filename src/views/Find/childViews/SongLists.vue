// 歌单广场
<template>
  <div class="song-lists">
    <div class="header">
      <div class="icon" @click="goback()">
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
import SongListItem from 'components/SongListItem'
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
  methods: {
    goback() {
      this.$router.go(-1)
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
  box-sizing: border-box;
  position: relative;
  .header {
    top: 0;
    left: 0;
    position: fixed;
    height: 46px;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
    .icon {
      float: left;
      margin-top: 8px;
      img {
        height: 30px;
        width: 30px;
      }
    }
    .title {
      float: left;
      margin: 12px 0 0 10px;
      span {
        font-size: 16px;
      }
    }
  }
  .content {
    margin-top: 46px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
