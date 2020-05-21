<template>
  <div id="app" class="app">
    <MainTabBar></MainTabBar>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <!-- maintabar -->
  </div>
</template>

<script>
import MainTabBar from '@/components/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style lang="scss"></style>
