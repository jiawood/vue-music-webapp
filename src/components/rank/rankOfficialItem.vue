<template>
  <div class="rank-official-item" @click="clickItem(itemId)">
    <rank-img
      :coverImgUrl="item.coverImgUrl"
      :updateFrequency="item.updateFrequency"
    ></rank-img>
    <div class="songs" >
      <div class="song" v-for="(song,index) of officialSongs" :key="index">
        <span>{{ index + 1 }}</span>
        <span>.</span>
        <span>{{ song.name }}</span>
        <span>-</span>
        <span>{{ song.ar[0].name }}</span>
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
  props: ['item','officialSongs'],
  computed:{
    itemId(){
      return this.item.id
    }
  },
  methods:{
    clickItem(id) {
      this.$router.push({name: 'PlayList', params: {play_list_id: id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-official-item {
  height: 110px;
  width: 330px;
  display: flex;
  flex-direction: row;
  .songs {
    margin-left: 10px;
    width: 220px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .song {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: rgb(99, 99, 99);
    }
  }
}
</style>
