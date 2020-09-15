<template>
  <div class="find-lists">
    <div class="container">
      <div
        class="find-lists-item"
        v-for="(icon, index) in icons"
        :key="index"
        @click="clickItem(index)"
      >
        <div class="red-radius">
          <div class="icons">
            <img :src="icon.src" alt="" />
          </div>
        </div>
        <div class="text">{{ icon.text }}</div>
      </div>
    </div>
    <div class="day">{{ today }}</div>
  </div>
</template>

<script>
export default {
  name: 'FindLists',
  data() {
    return {
      today: 0,
      icons: [
        {
          src: require('assets/icons/calendar.svg'),
          text: '每日推荐',
          path: '/recommend'
        },
        {
          src: require('assets/icons/song-lists.svg'),
          text: '歌单',
          path: '/song_lists'
        },
        {src: require('assets/icons/rank.svg'), text: '排行榜', path: '/rank'},
        {src: require('assets/icons/radio.svg'), text: '电台', path: '/radio'},
        {src: require('assets/icons/live.svg'), text: '直播', path: '/live'},
        {
          src: require('assets/icons/album.svg'),
          text: '数字专辑',
          path: '/album'
        }
      ]
    }
  },
  methods: {
    clickItem(index) {
      this.$router.push(this.icons[index].path)
    },
    getDay() {
      let now = new Date()
      return now.getDate()
    }
  },
  created() {
    this.today = this.getDay()
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.find-lists {
  // float: left;
  width: 360px;
  height: 100px;
  // padding: 0 15px;
  display: flex;
  overflow-x: auto;
  position: relative;
  .day {
    position: absolute;
    left: 32px;
    top: 38px;
    height: 10px;
    width: 10px;
    font-size: 8px;
    color: red;
  }
  .container {
    display: flex;
    flex-shrink: 0;
    width: 400px;
    height: 100px;
    justify-content: space-between;
    padding: 0 15px;
    margin: 0;
    box-sizing: border-box;
    .find-lists-item {
      height: 100px;
      width: 50px;
      // align-content: center;
      display: flex;
      flex-direction: column;
      padding: 15px 0;
      justify-content: space-between;
      box-sizing: border-box;
      // background-color: red;
      .red-radius {
        align-content: center;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        background-color: rgb(255, 33, 21);
        display: flex;
        align-items: center;
        justify-content: center;
        .icons {
          width: 25px;
          height: 25px;

          img {
            width: 25px;
            height: 25px;
            font-size: 25px;
            color: white;
            display: block;
            // background-color: white;
          }
        }
      }
      .text {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
