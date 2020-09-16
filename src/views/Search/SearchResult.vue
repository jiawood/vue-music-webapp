<template>
  <div class="search-result">
    <search-header />
    <div class="songs" v-if="songData.length > 0">
      <div class="songs-headers">单曲</div>
      <div class="content" v-for="(item, index) of songData" :key="item.id">
        <div class="list" @click="playSong(index)">
          <div class="content">
            <div class="song-name">
              <span class="name">
                {{ item.name }}
              </span>
            </div>
            <div class="ar">
              <span>
                {{ item.artists[0].name }}
              </span>
              <span v-if="item.alias[0]">-</span>
              <span>{{ item.alias && item.alias[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist" v-if="songListData.length > 0">
      <div class="songs-playlist">歌单</div>
      <div
        class="content"
        v-for="item of songListData"
        :key="item.id"
        @click="goPlayList(item.id)"
      >
        <div class="img">
          <img :src="item.coverImgUrl" alt="" class="src" />
        </div>
        <div class="message">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="detail">
            <span class="count">
              {{ item.bookCount }}
            </span>
            <span>songs</span>
            <span v-if="item.creator">by</span>
            <span class="creator">{{ item.creator }}</span>
            <span class="plays">{{ item.playCount | convertData }}</span>
            <span>plays</span>
          </div>
        </div>
      </div>
    </div>
    <go-top />
  </div>
</template>

<script>
import {getSearchSuggestion, getSearchSongs} from 'api/find'
import SearchHeader from 'components/search/SearchHeader'
import GoTop from 'components/GoTop'
export default {
  name: 'SearchResult',
  data() {
    return {
      songData: [],
      songListData: []
    }
  },
  components: {
    SearchHeader,
    GoTop
  },
  computed: {
    keyword() {
      return this.$route.params.keyword
    }
  },
  methods: {
    playSong(index) {
      this.$store.dispatch('setPlayShow', this.songData, index)
    },
    goPlayList(id) {
      this.$router.push({
        name: 'PlayList',
        params: {play_list_id: id}
      })
    }
  },
  filters: {
    convertData(data) {
      data = Number(data)
      if (data > 100000000) {
        let res = (data / 100000000).toFixed(2)
        return `${res}亿`
      } else if (data > 10000) {
        let res = (data / 10000).toFixed(2)
        return `${res}万`
      } else {
        return data
      }
    }
  },
  created() {
    getSearchSuggestion(`${this.keyword}`).then(res => {
      let data = res.data.result
      // if (data.songs) {
      //   this.songData = data.songs
      // }
      if (data.playlists) {
        this.songListData = data.playlists
      }
    }),
      getSearchSongs(`${this.keyword}`).then(res => {
        this.songData = res.data.result.songs.slice(0, 20)
      })
  },
  activated() {
    getSearchSuggestion(`${this.keyword}`).then(res => {
      let data = res.data.result
      // if (data.songs) {
      //   this.songData = data.songs
      // }
      if (data.playlists) {
        this.songListData = data.playlists
      }
    }),
      getSearchSongs(`${this.keyword}`).then(res => {
        this.songData = res.data.result.songs.slice(0, 20)
      })
  },
  watch: {
    keyword(newV) {
      getSearchSuggestion(newV).then(res => {
        let data = res.data.result
        // if (data.songs) {
        //   this.songData = data.songs
        // }
        if (data.playlists) {
          this.songListData = data.playlists
        }
      }),
        getSearchSongs(`${this.keyword}`).then(res => {
          this.songData = res.data.result.songs.slice(0, 20)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  width: 330px;
  padding: 0 15px;
}
.songs {
  .songs-headers {
    height: 40px;
    padding-top: 20px;
    font-weight: 600;
    line-height: 20px;
    box-sizing: border-box;
  }
  .content {
    .list {
      width: 330px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      .content {
        width: 330px;
        height: 40px;
        margin-top: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .song-name {
          height: 25px;
          color: black;
          span {
            line-height: 25px;
            font-size: 16px;
          }
        }
        .ar {
          height: 15px;

          color: #404040;
          span {
            font-size: 12px;
            line-height: 15px;
          }
        }
      }
    }
  }
}
.playlist {
  .songs-playlist {
    height: 50px;
    padding-top: 20px;
    font-weight: 600;
    line-height: 20px;
    box-sizing: border-box;
    padding-bottom: 10px;
    // padding-left: -5px;
  }
  .content {
    display: flex;
    .img {
      height: 80px;
      width: 80px;
      padding-right: 10px;
      img {
        height: 80px;
        width: 80px;
      }
    }
    .message {
      height: 80px;
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        height: 40px;
        line-height: 20px;
        font-size: 16px;
      }
      .detail {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        padding-left: 10px;
        span {
          display: inline-block;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
