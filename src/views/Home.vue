<template>
  <div class="home">
    <MainTabBar></MainTabBar>
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
