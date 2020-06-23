<template>
  <div class="song-list-item" @click="goPlayList(songItem.id)">
    <div class="item">
      <img v-lazy="songItem.picUrl + '?param=600y600'" />
      <div class="playCount">{{ songItem.playCount | formatNum }}</div>
    </div>
    <div class="item-name">{{ songItem.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'SongListItem',
  props: {
    songItem: Object
  },
  filters: {
    formatNum(num) {
      if (num > 100000000) {
        return '▷' + (num / 100000000).toFixed(2) + '亿'
      } else if (num > 100000) {
        return '▷' + (num / 10000).toFixed(1) + '万'
      } else {
        return '▷' + num
      }
    }
  },
  methods: {
    goPlayList(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list-item {
  height: 146px;
  width: 104px;
  .item {
    position: relative;
    height: 104px;
    width: 104px;
    img {
      height: 104px;
      width: 104px;
    }
    .playCount {
      position: absolute;
      top: 3px;
      right: 5px;
      font-size: 8px;
      color: white;
    }
  }
  .item-name {
    font-size: 12px;
  }
}
</style>
