<template>
  <div class="rank">
    <go-back name="排行榜"></go-back>
    <rank-header headerName="榜单推荐"></rank-header>
    <div class="top">
      <div v-for="item in topList" :key="item.id">
        <rank-item :item="item"></rank-item>
      </div>
    </div>

    <rank-header headerName="官方榜"></rank-header>

    <div class="official" v-for="(item,index) of officialList" :key="item.id">
      <rank-official-item
        :item="item"
        :officialSongs="officialSongs[index]"
      ></rank-official-item>
    </div>
    <rank-header headerName="特色榜"></rank-header>
    <div class="special">
      <div v-for="item of specialList" :key="item.id">
        <rank-item :item="item"></rank-item>
      </div>
    </div>
    <rank-header headerName="更多榜单"></rank-header>
    <div class="other">
      <div v-for="item of otherList" :key="item.id">
        <rank-item :item="item"></rank-item>
      </div>
    </div>
  </div>
</template>

<script>
import {getRankIds, playlistDetail} from 'api/find'
import GoBack from 'components/GoBack'
import rankHeader from 'components/rank/rankHeader'
import rankItem from 'components/rank/rankItem'
import rankOfficialItem from 'components/rank/rankOfficialItem'
let topListName = ['云音乐民谣榜', '云音乐摇滚榜', '台湾Hito排行榜']
let officialListName = [
  '云音乐飙升榜',
  '云音乐新歌榜',
  '云音乐热歌榜',
  '网易原创歌曲榜',
  '云音乐畅销榜'
]
let specialListName = ['抖音排行榜', '云音乐古典音乐榜', '云贝推歌榜']
export default {
  name: 'Rank',
  components: {
    GoBack,
    rankHeader,
    rankItem,
    rankOfficialItem
  },
  data() {
    return {
      topList: [],
      officialList: [],
      specialList: [],
      otherList: [],
      officialSongs: []
    }
  },
  methods: {
    //获取官方榜的前三首歌曲
    getSpecialSongs() {
      for (let item of this.officialList) {
        playlistDetail(item.id).then(res => {
          // console.log(res.data)
          let songLists = res.data.playlist.tracks.slice(0, 3)
          // console.log(songLists)
          // let name = item.name
          this.officialSongs.push(songLists)
        })
      }
    }
  },
  created() {
    getRankIds().then(res => {
      let lists = res.data.list
      for (let list of lists) {
        if (topListName.indexOf(list.name) > -1) {
          this.topList.push({
            updateFrequency: list.updateFrequency,
            coverImgUrl: list.coverImgUrl,
            name: list.name,
            id: list.id
          })
        } else if (officialListName.indexOf(list.name) > -1) {
          this.officialList.push({
            updateFrequency: list.updateFrequency,
            coverImgUrl: list.coverImgUrl,
            name: list.name,
            id: list.id
          })
        } else if (specialListName.indexOf(list.name) > -1) {
          this.specialList.push({
            updateFrequency: list.updateFrequency,
            coverImgUrl: list.coverImgUrl,
            name: list.name,
            id: list.id
          })
        } else {
          this.otherList.push({
            updateFrequency: list.updateFrequency,
            coverImgUrl: list.coverImgUrl,
            name: list.name,
            id: list.id
          })
        }
      }
    })
  },
  watch: {
    officialList() {
      this.getSpecialSongs()
    }
  }
}
</script>

<style lang="scss" scoped>
.rank {
  width: 340px;
  padding: 46px 5px 0 15px;
}
.top {
  display: flex;
  flex-direction: row;
}
.special {
  display: flex;
  flex-direction: row;
}
.other {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
