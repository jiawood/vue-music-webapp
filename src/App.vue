<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App'
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
