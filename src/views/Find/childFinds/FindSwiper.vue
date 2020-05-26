<template>
  <div class="findSwiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: 'FindSwiper',
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    },
    indicatorColor: {
      type: String,
      default: 'red'
    }
  }
}
</script>
<style lang="scss" scoped>
.findSwiper {
  padding: 15px 15px 0 15px;
}
::v-deep .van-swipe-item {
  height: 120px;
  width: 330px;
  img {
    height: 120px;
    width: 330px;
  }
}
</style>
