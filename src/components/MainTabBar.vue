<template>
  <van-nav-bar>
    <template #left>
      <van-icon name="menu" />
    </template>
    <template #title>
      <van-tabs v-model="active" line-width="0">
        <van-tab title="我的"></van-tab>
        <van-tab title="发现"></van-tab>
        <van-tab title="云村"></van-tab>
        <van-tab title="视频"></van-tab>
      </van-tabs>
    </template>
    <template #right>
      <van-icon name="search" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'MainTabBar',
  data() {
    return {
      active: 1
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-tab--active span {
  font-size: 40px;
}
</style>
