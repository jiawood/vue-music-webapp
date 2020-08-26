<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Player from 'views/Player/Player'
export default {
  name: 'App',
  components:{
    Player
  }
  // components: {
  //   MainTabBar
  // }
}
</script>

<style lang="scss">
.app {
  width: 360px;
}
</style>
