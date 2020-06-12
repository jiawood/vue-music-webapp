<template>
  <div class="songlists">
    <div class="top">
      <slot name="left" class="left">
        <div class="content">懂你的精选歌单</div>
      </slot>
      <div class="right" @click="clickItem">
        <div class="content">查看更多</div>
      </div>
    </div>
    <div class="content">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongLists',
  methods: {
    clickItem() {
      this.$router.push('/song_lists')
    }
  }
}
</script>

<style lang="scss" scoped>
.songlists {
  height: 200px;
  width: 360px;
  padding: 0 0 0 15px;
  box-sizing: border-box;
  .top {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .left .content {
      font-size: 12px;
      font-weight: 600;
    }
    .right {
      width: 70px;
      height: 30px;
      font-size: 10px;
      margin-top: 5px;
      box-sizing: border-box;
      overflow: hidden;
      padding-right: 15px;
      .content {
        // margin-top: 5px;
        line-height: 20px;
        // overflow: hidden;
        box-sizing: border-box;
        height: 20px;
        width: 55px;
        border: 1px solid #909090;
        border-radius: 15px;
        text-align: center;
      }
    }
  }
}
</style>
