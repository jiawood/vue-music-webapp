<template>
  <div class="rank-item" @click="clickItem(itemId)">
    <rank-img
      :coverImgUrl="item.coverImgUrl"
      :updateFrequency="item.updateFrequency"
    ></rank-img>
    <span class="name">{{ item.name }}</span>
  </div>
</template>

<script>
import rankImg from 'components/rank/rankImg'
export default {
  name: 'rankItem',
  computed: {
    itemId() {
      return this.item.id
    }
  },
  components: {
    rankImg
  },
  props: ['item'],
  methods: {
    clickItem(id) {
      this.$router.push({name: 'PlayList', params: {play_list_id: id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-item {
  height: 130px;
  box-sizing: border-box;
  width: 110px;
  padding: 0 10px 5px 0;
  .name {
    font-size: 12px;
    display: inline-block;
    margin-top: 10px;
    line-height: 20px;
    color: rgb(66, 66, 66);
  }
}
</style>
