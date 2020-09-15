<template>
  <div class="go-top" @click="backTop">
    <div @click="backTop">
      <span class="click">点击</span>
      <span class="back">,回到顶部</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoTop',
  methods: {
    backTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.go-top {
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 16px;
    color: black;
    .click {
      color: red;
    }
  }
}
</style>
