<template>
  <div class="go-back">
    <div class="icon" @click="goback()">
      <img :src="pImg" alt="" />
    </div>
    <div class="title">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoBack',
  props: ['name'],
  data() {
    return {
      pImg: require('assets/icons/left-arrow.svg')
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back {
  top: 0;
  left: 0;
  position: fixed;
  height: 46px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
  .icon {
    float: left;
    margin-top: 8px;
    img {
      height: 30px;
      width: 30px;
    }
  }
  .title {
    float: left;
    margin: 12px 0 0 10px;
    span {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
