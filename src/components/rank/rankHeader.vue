<template>
  <div class="rank-header">
    <span>{{ headerName }}</span>
  </div>
</template>
<script>
export default {
  name: 'rankHeader',
  props: ['headerName']
}
</script>

<style lang="scss" scoped>
.rank-header {
  height: 54px;
  padding: 24px 10px 10px 0px;
  box-sizing: border-box;
  span {
    line-height: 20px;
    font-size: 16px;
    color: black;
    font-weight: 600;
  }
}
</style>
