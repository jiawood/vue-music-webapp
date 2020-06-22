<template>
  <div>
    <song-lists class="songlists">
      <template v-slot:left>
        <div class="left">{{ recommendTop }}</div>
      </template>
      <template v-slot:content>
        <div class="content">
          <div class="container">
            <div
              class="item"
              v-for="(item, index) in recommendList"
              :key="index"
            >
              <div class="playcount">{{ convertNumber(item.playCount) }}</div>
              <img :src="item.coverImgUrl" alt="" class="img" />
              <div class="name">{{ lessMessage(item.name) }}</div>
            </div>
          </div>
        </div>
      </template>
    </song-lists>
  </div>
</template>

<script>
import SongLists from './SongLists'
export default {
  name: 'FindRecommend',
  components: {
    SongLists
  },
  data() {
    return {}
  },
  methods: {
    lessMessage(str) {
      if (str.length >= 18) {
        return str.slice(0, 18) + '...'
      }
      return str
    },
    convertNumber(num) {
      if (num > 100000000) {
        return '▷' + (num / 100000000).toFixed(1) + '亿'
      } else if (num > 10000) {
        return '▷' + ((num / 10000) | 0) + '万'
      }
      return '▷' + num
    }
  },
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    },
    recommendTop: {
      type: String,
      default() {
        return '精选歌单'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.left {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
}
.content {
  height: 150px;
  width: 345px;
  display: flex;
  overflow-x: auto;

  .container {
    flex-shrink: 0;
    width: 650px;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item {
      height: 150px;
      width: 100px;
      position: relative;
      .playcount {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 10px;
        color: white;
      }
      .img {
        height: 100px;
        width: 100px;
      }
      .name {
        font-size: 10px;
      }
    }
  }
}
</style>
