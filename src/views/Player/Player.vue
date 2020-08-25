<template>
  <div class="player" v-show="showPlayer">
    <transition name="full">
      <div class="full">
        <div class="bgimg">
          <img
            class="bgi"
            :src="playList[currentIndex].al && playList[currentIndex].al.picUrl"
            alt=""
          />
        </div>
        <div class="header">
          <i class="iconfont icon-fanhui" @click="toggle"></i>
          <div class="song-name" v-text="playList[currentIndex].name"></div>
          <div
            class="singer-name"
            v-if="playList[currentIndex].ar && playList[currentIndex].ar.length"
          >
            <template v-for="(item, index) in playList[currentIndex].ar">
              {{ playList[currentIndex].ar[index].name }}
              <template
                v-if="
                  index >= 0 && index < playList[currentIndex].ar.length - 1
                "
                >/</template
              >
            </template>
            - {{ playList[currentIndex].al && playList[currentIndex].al.name }}
          </div>
        </div>
        <div class="middle">
          <div class="circle">
            <img :src="playList[currentIndex].al.picUrl" alt="" />
          </div>
        </div>
        <div class="progress">
          <v-progress
            :duration="songDuration"
            :currentTime="currentTime"
            @changeCurrentTime="changeTime"
            @MoveCurrentTime="moveProgressBtn"
          ></v-progress>
        </div>
        <div class="bottom-btn">
          <i class="iconfont icon-xunhuan" @click="changePlaylist"></i>
          <i class="iconfont icon-shangyishoushangyige" @click="prevSong"></i>
          <i
            class="iconfont iconplay"
            :class="bofang"
            @click="clickPlayStatus"
          ></i>
          <i class="iconfont icon-xiayigexiayishou" @click="nextSong"></i>
          <i class="iconfont icon-SongListgedan" @click="togglePlayList"></i>
        </div>
      </div>
    </transition>
    <transition name="mini"></transition>
    <div class="mask"></div>
    <transition name="playlist">
      <div class="playlist-content" v-show="showPlayList">
        <div class="playlist-header">
          <div class="header-title">
            当前播放
            <span>({{ playList.length }})</span>
          </div>
        </div>
        <div class="playlist-main">
          <div
            class="list-song-item"
            :class="{active: item.id === itemId}"
            v-for="(item, index) in playList"
            :key="index"
            @click="playSong(item, index)"
          >
            <div class="item-detail">
              <div class="song">
                {{ item.name }}
                <span class="singer">
                  - {{ item.ar[0].name }}
                  <template v-if="item.ar.length > 1"
                    >/{{ item.ar[1].name }}</template
                  >
                  -{{ item.al.name }}
                </span>
              </div>
            </div>
            <div class="song-more" @click.stop>
              <i class="iconfont icon-chacha"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="url"
      @canplay="canplay"
      @timeupdate="timeupdate"
      @ended="end"
      @error="error"
      autoplay
    ></audio>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {mapState, mapMutations} from 'vuex'
import vProgress from 'components/Progress.vue'
import {getSongUrl} from 'api/find'

export default {
  name: 'Player',
  components: {
    vProgress
  },
  data() {
    return {
      message: '功能未开发',
      isMove: false,
      songDuration: 300,
      currentTime: 0,
      // playing: false,
      url:
        'http://m7.music.126.net/20200824215025/7a7af343da24cf53adfca906c718aec7/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3673664640/ed9f/3920/937f/0c9d582a3e647bd1a121c667e2f89ad4.mp3'
    }
  },
  computed: {
    // ...mapState(['playList', 'currentIndex']),
    ...mapState([
      'currentIndex',
      'showPlayer',
      'fullScreen',
      'playList',
      'playing'
    ]),
    bofang() {
      return this.playing ? 'icon-zanting_huaban' : 'icon-bofang'
    },
    songId() {
      return this.playList[this.currentIndex].id
    }
  },
  methods: {
    // ...mapMutations(['SETCURRENTINDEX']),
    toast(message) {
      Toast(message)
    },
    canplay() {
      let playP = this.$refs.audio.play()
      if (playP !== undefined) {
        playP.then(() => {}).catch(() => {})
      }
      this.songDuration = this.$refs.audio.duration
      this.$store.commit('SETPLAYING', this.$refs.audio.paused)
    },
    toggle() {
      this.$router.go(-1)
      //the flowing code to show the mini player
    },
    //进度条相关
    //isMove用于区分点击和移动事件
    changeTime(currentTime, isMove) {
      this.isMove = isMove
      this.$refs.audio.currentTime = currentTime
    },
    moveProgressBtn(changeTime, isMove) {
      this.currentTime = changeTime
      this.isMove = isMove
    },
    timeupdate() {
      if (!this.isMove) {
        this.currentTime = this.$refs.audio.currentTime
      }
    },

    //audio 相关的api
    end() {
      this.nextSong()
    },
    error() {
      let timer = null
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        Toast({message: '无法播放收费歌曲！', duration: 3000})
        // this.$loading.hide();
        // this.togglePlayer();
        this.clickPlayStatus()
      }, 2000)
    },

    //播放按钮相关的api
    //改变播放列表的顺序
    changePlaylist() {
      Toast(this.message)
    },

    //前一首
    prevSong() {
      let currentIndex = this.currentIndex
      if (this.currentIndex == 0) {
        currentIndex = this.playList.length - 1
      } else {
        currentIndex -= 1
      }
      this.$store.commit('SETCURRENTINDEX', currentIndex)
    },
    //切换播放状态
    clickPlayStatus() {
      let playing = !this.playing
      this.$store.commit('SETPLAYING', playing)
    },
    nextSong() {
      let currentIndex = this.currentIndex
      if (this.currentIndex == this.playList.length - 1) {
        currentIndex = 0
      } else {
        currentIndex += 1
      }
      this.$store.commit('SETCURRENTINDEX', currentIndex)
    },
    togglePlayList() {},

    //得到当前音乐的MP3文件
    getUrl(id) {
      let self = this
      getSongUrl(id).then(res => {
        // console.log(res)
        // debugger
        if (res.data.code === 200) {
          self.url = res.data.data[0].url
        }
      })
    }
  },

  //页面挂载之后
  mounted() {
    this.getUrl(this.songId)
    this.$store.commit('SETPLAYING', true)
  },

  //属性监测
  watch: {
    currentIndex(newV) {
      this.getUrl(this.playList[newV].id)
    },
    playing(newV) {
      if (newV) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  height: 640px;
  width: 360px;
  position: relative;
  background-color: rgb(111, 111, 111);
  overflow: hidden;
  z-index: 10;
  .full {
    .bgimg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      .bgi {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        filter: blur(300px);
      }
    }
    .header {
      position: relative;
      z-index: 20;
      height: 70px;
      width: 360px;
      .icon-fanhui {
        width: 50px;
        height: 70px;
        // float: left;
        font-size: 30px;
        position: absolute;
        top: 20px;
        left: 10px;
        color: white;
      }
      .song-name {
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        font-size: 20px;
        line-height: 40px;
        font-weight: 700;
        color: white;
      }
      .singer-name {
        display: inline-block;
        box-sizing: border-box;
        margin-top: -10px;
        text-align: center;
        height: 30px;
        width: 100%;
        font-size: 16px;
        line-height: 30px;
        color: whitesmoke;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .middle {
      height: 400px;
      width: 360px;
      position: relative;
      .circle {
        height: 200px;
        width: 200px;
        border-radius: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
          height: 200px;
          width: 200px;
          border-radius: 100%;
          box-shadow: 0 0 0 20px gray;
          animation: rotate 10s linear infinite;

          @keyframes rotate {
            0% {
              transform: rotate(0);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
    }
    .progress {
      position: relative;
      z-index: 20;
      height: 40px;
      width: 360px;
      margin-top: 20px;
      // box-sizing: border-box;
      // display: flex;
      // align-items: center;
    }
    .bottom-btn {
      position: relative;
      z-index: 20;
      height: 100px;
      width: 360px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .iconfont {
        font-size: 25px;
        color: white;
      }
      .iconplay {
        font-size: 50px;
      }
    }
  }
}
</style>
