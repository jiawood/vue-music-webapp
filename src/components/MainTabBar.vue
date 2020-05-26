<template>
  <van-nav-bar
    @click-left="onClickLeft"
    @click-right="onClickRight"
    border="border"
  >
    <template #left>
      <van-icon name="wap-nav" size="25px" color="rgb(100,100,100)" />
    </template>
    <template #title>
      <div class="contain">
        <van-tabs v-model="active" line-width="0" @click="onClick">
          <van-tab title="我的" class="fuck"></van-tab>
          <van-tab title="发现"></van-tab>
          <van-tab title="云村"></van-tab>
          <van-tab title="视频"></van-tab>
        </van-tabs>
      </div>
    </template>
    <template #right>
      <van-icon name="search" size="25px" color="rgb(100,100,100)" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'MainTabBar',
  data() {
    return {
      path: ['/profile', '/find', '/cloud_village', '/video'],
      active: 1,
      show: false,
      border: false
    }
  },
  methods: {
    onClick(name) {
      this.$router.push(this.path[name])
    },
    onClickLeft() {},
    onClickRight() {
      this.$router.push('./search')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-tab--active span {
  font-size: 20px;
  color: rgb(0, 0, 0);
  font-weight: 600;
}
::v-deep .van-tab {
  font-size: 16px;
  padding: 0 10px;
  color: rgb(100, 100, 100);
}
</style>
