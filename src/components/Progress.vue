<template>
  <div class="player-progress">
    <div class="song-time start">{{ startTime }}</div>
    <div class="progress-box" ref="progressBox">
      <div
        class="progress"
        :style="{width: progWidth + 'px'}"
        ref="progressLine"
      ></div>
      <div class="slider-btn" :style="{left: btnLeft + 'px'}" ref="progressBtn">
        <!-- <div class="inner"></div> -->
      </div>
    </div>
    <div class="song-time end">{{ endTime }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progWidth: 0,
      btnLeft: -this.btnHalfW
    }
  },
  props: {
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  computed: {
    endTime() {
      return this.timeFormat(this.duration)
    },
    startTime() {
      return this.timeFormat(this.currentTime)
    },
    btnHalfW() {
      return this.$refs.progressBtn.offsetWidth / 2
    }
  },
  watch: {
    currentTime(newValue) {
      this.progWidth = parseInt(
        (newValue / this.duration) * this.$refs.progressBox.offsetWidth
      )
      this.btnLeft = parseInt(
        (newValue / this.duration) * this.$refs.progressBox.offsetWidth -
          this.$refs.progressBtn.offsetWidth / 2
      )
    }
  },
  mounted() {
    this.setProgress()
  },
  methods: {
    setProgress() {
      const _this = this
      const progressBox = this.$refs.progressBox
      const progressBtn = this.$refs.progressBtn
      const progressLine = this.$refs.progressLine
      const boxLeft = progressBox.getBoundingClientRect().left
      const btnW = progressBtn.offsetWidth

      progressBox.addEventListener(
        'click',
        function(event) {
          const progressLineW = event.pageX - boxLeft
          if (progressLineW >= 0 && progressLineW <= progressBox.offsetWidth) {
            progressLine.style.width = progressLineW + 'px'
            progressBtn.style.left = progressLineW - btnW / 2 + 'px'
          }
          _this.$emit(
            'changeCurrentTime',
            parseInt(
              (parseInt(progressLine.offsetWidth) / progressBox.offsetWidth) *
                _this.duration
            ),
            false
          )
        },
        false
      )

      progressBtn.addEventListener(
        'touchmove',
        function(event) {
          // 边界限制
          const setBtnLeft = event.changedTouches[0].pageX - boxLeft
          if (setBtnLeft <= 0) {
            progressBtn.style.left = -btnW / 2 + 'px'
            progressLine.style.width = 0 + 'px'
          } else if (setBtnLeft >= progressBox.offsetWidth - btnW / 2) {
            progressBtn.style.left = progressBox.offsetWidth - btnW / 2 + 'px'
            progressLine.style.width = progressBox.offsetWidth + 'px'
          } else {
            progressBtn.style.left =
              event.changedTouches[0].pageX - boxLeft + 'px'
            progressLine.style.width =
              event.changedTouches[0].pageX - boxLeft + btnW / 2 + 'px'
          }
          _this.$emit(
            'MoveCurrentTime',
            parseInt(
              (parseInt(progressLine.offsetWidth) / progressBox.offsetWidth) *
                _this.duration
            ),
            true
          )
        },
        false
      )

      progressBtn.addEventListener(
        'touchend',
        function() {
          // console.log(progressLine.offsetWidth)
          _this.$emit('changeCurrentTime', _this.currentTime, false)
        },
        false
      )
    },
    // 把数字转出 '03: 23' 这样的格式
    timeFormat(time) {
      let minu = 0
      let sec = 0
      time = Math.floor(time % 3600)
      minu = Math.floor(time / 60)
      sec = Math.floor(time % 60)
      sec = sec < 10 ? '0' + sec : sec + ''
      minu = minu < 10 ? '0' + minu : minu + ''
      return minu + ':' + sec
    }
  }
}
</script>
<style lang="scss" scoped>
.player-progress {
  display: flex;
  align-items: center;
  height: 20px;

  .song-time {
    flex: 0 0 60px;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    color: white;
  }

  .progress-box {
    flex: 1 0 auto;
    height: 2px;
    border-radius: 10px;
    background: rgb(155, 155, 155);
    position: relative;

    .progress {
      border-radius: 10px;
      width: 0%;
      height: 100%;
      background: rgb(211, 211, 211);
    }

    .slider-btn {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: white;
      position: absolute;
      left: -3px;
      top: -2px;
      &:after {
        content: '';
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .inner {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
