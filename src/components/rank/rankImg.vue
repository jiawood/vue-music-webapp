<template>
  <div class="rank-img">
    <img :src="coverImgUrl" alt="" srcset="" />
    <span>{{ updateFrequency }}</span>
  </div>
</template>
<script>
export default {
  name: 'rankImg',
  props: ['coverImgUrl', 'updateFrequency']
}
</script>

<style lang="scss" scoped>
.rank-img {
  height: 100px;
  width: 100px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  img {
    height: 100px;
    width: 100px;
  }
  span {
    position: absolute;
    left: 3px;
    bottom: 5px;
    color: white;
    font-size: 8px;
  }
}
</style>
