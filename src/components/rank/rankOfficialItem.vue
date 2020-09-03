<template>
  <div class="rank-official-item">
    <rank-img
      :coverImgUrl="item.coverImgUrl"
      :updateFrequency="item.updateFrequency"
    ></rank-img>
    <div class="songs" >
      <div class="song" v-for="(song,index) of officialSongs" :key="index">
        <span>{{ index + 1 }}</span>
        <span>{{ song.m.name }}</span>
        <span>-</span>
        <span>{{ song.ar[0].alias.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import rankImg from 'components/rank/rankImg'
export default {
  name: 'rankOfficialItem',
  components: {
    rankImg
  },
  props: ['item','officialSongs']
}
</script>

<style lang="scss" scoped>
.rank-official-item {
  height: 110px;
  width: 330px;
  display: flex;
  flex-direction: row;
  .songs {
    width: 220px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .song {
      line-height: 20;
      font-size: 16px;
      color: rgb(99, 99, 99);
    }
  }
}
</style>
