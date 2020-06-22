<template>
  <div class="find-recommend-music">
    <div class="top">
      <slot>
        <div class="left">大家都在听</div>
      </slot>
      <div class="right">
        <div class="border" @click="itemClick()">
          <span class="icon">
            <img :src="icons.bTriangle" alt class="icon" />
          </span>
          <span class="content">
            <span>播放全部</span>
          </span>
        </div>
      </div>
    </div>
    <div class="content">
      <swiper :options="songSwiperOption" class="swiper-container">
        <swiper-slide
          v-for="(item, index) in musicData"
          :key="index"
          class="swiper-slide"
        >
          <div
            class="music-item"
            v-for="(item1, index1) in item"
            :key="index1"
            @click="playSong(item1)"
          >
            <div class="recommend-music-item">
              <div class="recommend-music-item-pic">
                <img
                  v-if="item1.picUrl"
                  v-lazy="item1.picUrl + '?param=200y200'"
                  class="music-item-pic"
                />
                <img
                  v-else-if="item1.album.picUrl"
                  v-lazy="item1.album.picUrl + '?param=200y200'"
                  class="music-item-pic"
                />
                <img v-else :src="pic" class="music-item-pic" />
              </div>
              <div class="music-item-text">
                <div class="music-item-name">{{ item1.name }}</div>
                <div class="music-item-artists" v-if="item1.artists">
                  {{ item1.artists[0].name }}
                </div>
                <div class="music-item-artists" v-else-if="item1.song.artists">
                  {{ item1.song.artists[0].name }}
                </div>
              </div>
              <div class="music-item-icon">
                <div class="icon">
                  <img :src="icons.rTriangle" alt />
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendMusicData: Array
  },
  data() {
    return {
      songSwiperOption: {
        slidesPerView: 'auto',
        resistanceRatio: 0.3,
        nested: true
      },
      icons: {
        bTriangle: require('assets/icons/b-triangle.svg'),
        rTriangle: require('assets/icons/r-triangle.svg')
      }
    }
  },
  computed: {
    musicData() {
      const res = this.arrTrans(3, this.recommendMusicData)
      return res
    }
  },
  methods: {
    arrTrans(num, arr) {
      const newArr = []
      while (arr.length >= num) {
        newArr.push(arr.splice(0, num))
      }
      return newArr
    },
    itemClick() {
      console.log('未开发')
    },
    playSong(song) {
      console.log('播放' + song)
    }
  }
}
</script>

<style lang="scss" scoped>
.find-recommend-music {
  height: 230px;
  width: 345px;
  padding-left: 15px;
  .top {
    height: 30px;
    width: 330px;
    padding-right: 15px;
    .left {
      float: left;
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
    }
    .right {
      float: right;
      height: 30px;
      width: 65px;
      .border {
        margin-top: 5px;
        line-height: 20px;
        // overflow: hidden;
        box-sizing: border-box;
        height: 20px;
        width: 65px;
        border: 1px solid #909090;
        border-radius: 15px;
        text-align: center;
        font-size: 10px;
        .icon {
          height: 8px;
          width: 8px;
        }
        .content {
          margin-left: 2px;
        }
      }
    }
  }
  .content {
    height: 200px;
    width: 345px;
    overflow-x: auto;
    .swiper-container {
      width: 345px;
      height: 200px;
      .swiper-slide {
        width: 330px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .music-item {
          height: 56px;
          width: 330px;
          .recommend-music-item {
            height: 56px;
            width: 330px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .recommend-music-item-pic {
              width: 56px;
              height: 56px;
              .music-item-pic {
                width: 56px;
                height: 56px;
              }
            }
            .music-item-text {
              width: 200px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .music-item-name {
                font-size: 12px;
                margin-bottom: 5px;
              }
              .music-item-artists {
                font-size: 10px;
                color: rgb(37, 37, 38);
              }
            }
            .music-item-icon {
              width: 50px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .icon{
                height: 25px;
                width: 25px;
                border: 1px solid #909090;
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                // align-self: center;
                img{
                  height: 8px;
                  width: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
