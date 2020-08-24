<template>
  <div class="player">
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
            v-if="index >= 0 && index < playList[currentIndex].ar.length - 1"
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
    <div class="bottom"></div>
    <audio :src="url" ref="audio" controls @canplay="canplay" @timeupdate="timeupdate" @ended="end" @error="error"></audio>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {mapState} from 'vuex'
import vProgress from 'components/Progress.vue'
export default {
  name: 'Player',
  components:{
    vProgress
  },
  data() {
    return {
      message: '功能未开发',
      isMove:false,
      songDuration:300,
      currentTime:0,
      url: "http://m7.music.126.net/20200824215025/7a7af343da24cf53adfca906c718aec7/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3673664640/ed9f/3920/937f/0c9d582a3e647bd1a121c667e2f89ad4.mp3",
      playList: [
        {
          name: 'queen',
          id: 1341937292,
          pst: 0,
          t: 0,
          ar: [
            {
              id: 12381092,
              name: 'slenderbodies',
              tns: [],
              alias: []
            }
          ],
          alia: [],
          pop: 100,
          st: 0,
          rt: '',
          fee: 8,
          v: 5,
          crbt: null,
          cf: '',
          al: {
            id: 75321666,
            name: 'soraya',
            picUrl:
              'http://p4.music.126.net/dccYQAJy85RcXn7O9QiDdw==/109951163926343857.jpg',
            tns: [],
            pic_str: '109951163926343857',
            pic: 109951163926343860
          },
          dt: 170318,
          h: {
            br: 320000,
            fid: 0,
            size: 6813823,
            vd: -2
          },
          m: {
            br: 192000,
            fid: 0,
            size: 4088311,
            vd: -2
          },
          l: {
            br: 128000,
            fid: 0,
            size: 2725555,
            vd: -2
          },
          a: null,
          cd: '01',
          no: 4,
          rtUrl: null,
          ftype: 0,
          rtUrls: [],
          djId: 0,
          copyright: 1,
          s_id: 0,
          mark: 270336,
          originCoverType: 0,
          noCopyrightRcmd: null,
          mv: 0,
          rtype: 0,
          rurl: null,
          mst: 9,
          cp: 7003,
          publishTime: 1548345600000
        }
      ]
    }
  },
  computed: {
    // ...mapState(['playList', 'currentIndex']),
    ...mapState(['currentIndex'])
  },
  methods: {
    canplay() {
      this.$refs.audio.play()
      this.songDuration = this.$refs.audio.duration
      this.$store.commit('SETPLAYING', !this.$refs.audio.paused)
    },
    toggle() {
      this.$router.go(-1)
      //the flowing code to show the mini player
    },
    //isMove用于区分点击和移动事件
    changeTime(currentTime,isMove){
      this.isMove = isMove
      this.$refs.audio.currentTime = currentTime
    },
    moveProgressBtn(changeTime,isMove){
      this.currentTime = changeTime
      this.isMove = isMove
    },
    timeupdate(){
      if(!this.isMove) {
        this.currentTime = this.$refs.audio.currentTime
      }
    },
    end(){},
    error(){}
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
}
</style>
