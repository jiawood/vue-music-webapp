<template>
  <div class="player" v-show="showPlayer">
    <transition name="full">
      <div class="full" v-show="fullScreen">
        <div class="bgimg">
          <img
            class="bgi"
            :src="playList[currentIndex].al && playList[currentIndex].al.picUrl"
            alt=""
          />
        </div>
        <div class="header">
          <i class="iconfont icon-fanhui" @click="togglePlayer"></i>
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
        <div class="middle" @click="toggleLyric">
          <div class="circle" v-show="!showLyric">
            <img
              :src="playList[currentIndex].al && playList[currentIndex].al.picUrl"
              alt=""
              :class="playing ? 'isPlay' : 'isPaused'"
            />
          </div>
          <div class="lyric" v-show="showLyric">
            <div
              class="lyric-text"
              ref="lyricText"
              v-if="currentLyric"
              @scroll="handlerLyricScroll"
            >
              <p
                ref="lyricLine"
                v-for="(item, index) in currentLyric.lines"
                :key="index"
                :class="{active: currentLine === index}"
              >
                {{ item.txt }}
              </p>
            </div>
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
    <transition name="mini">
      <div
        class="mini-player"
        v-show="!fullScreen"
        v-if="playList[currentIndex]"
      >
        <div class="bgimg song-play" @click="togglePlayer">
          <img
            class="bgi"
            :src="playList[currentIndex].al && playList[currentIndex].al.picUrl"
            alt
          />
        </div>
        <div class="player-text" @click="togglePlayer">
          <div class="song-name" v-text="playList[currentIndex].name"></div>
          <div class="singer-name" v-if="playList[currentIndex].ar && playList[currentIndex].ar.length">
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
        <div class="player-status">
          <i class="iconfont" :class="bofang" @click="clickPlayStatus"></i>
        </div>
        <div class="player-list" @click="togglePlayList">
          <i class="iconfont icon-PlayListbofangliebiao"></i>
        </div>
      </div>
    </transition>
    <div class="mask" @click="togglePlayList" v-show="showPlayList"></div>
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
                <span class="singer" v-if="item.ar && item.ar[0]">
                  - {{ item.ar[0].name }}
                  <template v-if="item.ar && item.ar.length > 1"
                    >/{{ item.ar[1].name }}</template
                  >
                  -{{ item.al.name }}
                </span>
              </div>
            </div>
            <div class="song-delete" @click.stop>
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
import {getSongUrl, getLyric} from 'api/find'
import Lyric from 'utils/parse-lyric.js'

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
      currentTimer: null,
      showLyric: false,
      currentLine: 0,
      lyricText: null,
      lyricScroll: 0,
      currentLyric: null,
      scrollTimer: null,
      showPlayList: false,
      itemId: 0,
      // playing: false,
      url: null
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
      this.$store.commit('SETPLAYING', !this.$refs.audio.paused)
    },

    //进度条相关
    //isMove用于区分点击和移动事件
    changeTime(currentTime, isMove) {
      this.isMove = isMove
      this.$refs.audio.currentTime = currentTime
      this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
    },
    moveProgressBtn(changeTime, isMove) {
      this.currentTime = changeTime
      this.isMove = isMove
    },
    timeupdate() {
      if (!this.isMove) {
        this.currentTime = this.$refs.audio.currentTime
      }
      // console.log(1)
      if (this.playing) {
        this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
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
        this.toast({message: '无法播放收费歌曲！', duration: 3000})
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

    //播放指定index的歌曲
    playSong(item, index) {
      this.itemId = item.id
      this.$store.commit('SETCURRENTINDEX', index)
    },

    //前一首
    prevSong() {
      let currentIndex = this.currentIndex
      if (this.currentIndex == 0) {
        currentIndex = this.playList.length - 1
      } else {
        currentIndex -= 1
      }
      this.currentLyric.stop()
      this.$store.commit('SETCURRENTINDEX', currentIndex)
    },
    //切换播放状态
    clickPlayStatus() {
      this.playing ? this.$refs.audio.pause() : this.$refs.audio.play()
      this.$store.commit('SETPLAYING', !this.playing)
      this.currentLyric.togglePlay()
      // debugger
      // console.log(this)
    },
    nextSong() {
      let currentIndex = this.currentIndex
      if (this.currentIndex == this.playList.length - 1) {
        currentIndex = 0
      } else {
        currentIndex += 1
      }
      this.currentLyric.stop()
      this.$store.commit('SETCURRENTINDEX', currentIndex)
    },

    //是否显示播放列表
    togglePlayList() {
      this.showPlayList = !this.showPlayList
    },

    //得到当前音乐的MP3文件
    getUrl(id) {
      let self = this
      this.$refs.audio.pause()
      getSongUrl(id).then(res => {
        // console.log(res)
        // debugger
        if (res.data.code === 200) {
          self.url = res.data.data[0].url
        }
      })
    },

    //mini播放器相关
    //切换播放器
    togglePlayer() {
      if (this.fullScreen) {
        this.$router.go(-1)
      } else {
        this.$router.push('/Player')
      }
      this.$store.commit('SETFULLSCREEN', !this.fullScreen)
    },

    //歌词解析相关
    //切换歌词
    toggleLyric() {
      this.showLyric = !this.showLyric
    },

    //setlyric获取歌词并将歌词传入Lyric对象
    setLyric(id) {
      if (this.currentLyric) {
        // console.log('清除旧的对象');
        this.currentLyric.stop()
        this.currentLyric = null
        // console.log('currentLyric', this.currentLyric)
      }
      getLyric(id).then(res => {
        // console.log(res);
        let ly = ''
        if (res.data.lrc && res.data.lrc.lyric) {
          ly = res.data.lrc.lyric
        } else {
          ly = '[00:00.00]纯音乐,请欣赏!'
        }
        this.currentLyric = new Lyric(ly, this.handlerLyric)
        if (this.currentLyric.lines.length === 0) {
          this.currentLyric = new Lyric(
            '[00:00.00]纯音乐,请欣赏!',
            this.handlerLyric
          )
          this.nowLyric = '纯音乐,请欣赏!'
          // console.log('---空的')
        } else {
          this.nowLyric = this.currentLyric.lines[0].txt
        }
        // console.log('播放状态:', this.playing)
        // if (this.playing) {
        //   this.currentLyric.play()
        // }
        // console.log('---', this.currentLyric);
      })
    },
    //handlerLyric歌词处理
    handlerLyric({lineNum, txt}) {
      this.currentLine = lineNum
      this.nowLyric = txt
      const halfH = 160
      if (lineNum < 5) {
        // console.log('不用滚动')
        this.lyricScroll = 0
      } else {
        // this.$refs.lyricLine[lineNum - 5]
        if (this.$refs.lyricLine[lineNum]) {
          this.lyricScroll = this.$refs.lyricLine[lineNum].offsetTop - halfH
          this.$refs.lyricText.scrollTo({
            top: this.$refs.lyricLine[lineNum].offsetTop - halfH,
            behavior: 'smooth'
          })
        }
      }
    },
    //处理歌词滚动
    handlerLyricScroll() {
      this.scrollTimer && clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        // console.log('scollback')
        this.$refs.lyricText.scrollTo({
          top: this.lyricScroll,
          behavior: 'smooth'
        })
      }, 30)
    }
  },

  // 页面挂载之后
  // mounted() {
  //   this.getUrl(this.songId)
  // },

  //属性监测
  watch: {
    currentIndex(newV) {
      this.getUrl(this.playList[newV].id)
      this.itemId = this.playList[newV].id
      this.setLyric(this.playList[newV].id)
    },
    $route(to, from) {
      // 没点左上角的退出按钮, 手机直接操作返回, 或者浏览器直接返回时 隐藏播放界面
      if (from.path === '/Player') {
        if (this.fullScreen) {
          this.$store.commit('SETFULLSCREEN', !this.fullScreen)
        }
      }
      // 前进动作
      if (to.path === '/Player') {
        if (!this.fullScreen) {
          this.$store.commit('SETFULLSCREEN', !this.fullScreen)
        }
      }
    },
    playList() {
      this.getUrl(this.playList[this.currentIndex].id)
      this.setLyric(this.playList[this.currentIndex].id)
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  .full {
    height: 640px;
    width: 360px;
    position: relative;
    background-color: rgb(111, 111, 111);
    overflow: hidden;
    z-index: 10;
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
        padding: 0 50px;
        font-size: 20px;
        line-height: 40px;
        font-weight: 700;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .singer-name {
        display: inline-block;
        box-sizing: border-box;
        margin-top: -10px;
        text-align: center;
        padding: 0 50px;
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
          display: inline-block;

          @keyframes rotate {
            0% {
              transform: rotate(0);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        }
        .isPlay {
          animation-play-state: running;
        }
        .isPaused {
          animation-play-state: paused;
        }
      }
      .lyric {
        height: 400px;
        width: 360px;
        padding: 0 30px;
        box-sizing: border-box;
        overflow: scroll;
        .lyric-text {
          // display: flex;
          // flex-direction: column;
          // align-self: center;
          text-align: center;
          overflow: auto;
          height: 400px;
          &::-webkit-scrollbar {
            display: none;
          }
          p {
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            margin: 0;
            color: rgb(188, 188, 188);
            width: 300px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .active {
            color: white;
          }
        }
      }
    }
    .progress {
      position: relative;
      z-index: 1000;
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

.full-enter-active,
.full-leave-active {
  opacity: 1;
}
.full-enter,
.full-leave-to {
  opacity: 0;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 303;
  background-color: rgba(45, 45, 45, 0.45);
}
.playlist-content {
  position: fixed;
  bottom: 55px;
  width: 280px;
  left: 40px;
  background: white;
  z-index: 303;
  border-radius: 10px;
  padding: 10px 8px;
  font-size: 16px;
  box-shadow: 0px 0px 5px black;

  .playlist-header {
    .header-title {
      padding: 5px 0 15px;
      span {
        color: #8e8e8e;
      }
    }
  }

  .playlist-main {
    max-height: 300px;
    overflow-y: scroll;
    .active {
      color: red;
      .singer {
        font-size: 12px;
        color: red !important;
      }
    }
    .list-song-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      .item-detail {
        display: flex;
        overflow: hidden;
        .song {
          font-size: 14px;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          .singer {
            font-size: 10px;
            color: #696363;
          }
        }
      }
    }
  }
}
.playlist-enter-active,
.playlist-leave-active {
  transition: all 0.25s;
}

.playlist-enter,
.playlist-leave-to {
  transform: translate(0, 130%);
  opacity: 0;
}

//mini-player样式
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  z-index: 300;
  display: flex;
  align-items: center;
  border-top: 1px solid #e2e2e2;

  .bgimg {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    overflow: hidden;
    margin-left: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .player-text {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    font-size: 12px;
    color: #585858;
    flex: 1 0 auto;
    line-height: 1.5;

    div {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 200px;
    }
  }

  .player-status {
    padding: 0 0 0 10px;

    .iconfont {
      font-size: 26px;
      color: #d23333;
      font-weight: bold;
    }
  }

  .player-list {
    padding: 0 10px 0 15px;
    .icon-PlayListbofangliebiao {
      font-size: 26px;
      color: #d23333;
    }
  }
}

//mini动画相关
.mini-enter-active,
.mini-leave-active {
  opacity: 1;
}

.mini-enter,
.mini-leave-to {
  opacity: 0;
}
</style>
