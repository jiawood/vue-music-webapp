<template>
  <div class="home">
    <MainTabBar class="sticky"></MainTabBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from 'components/MainTabBar'

export default {
  name: 'Home',
  components: {
    MainTabBar
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
