<template>
  <div class="play-list">
    <div class="top">
      <div class="header">
        <div class="left-arrow" @click="goBack()">
          <img :src="leftArrow" alt="" />
        </div>
        <div class="title">
          <span>歌单</span>
        </div>
        <div class="search" @click="toast(message)">
          <img :src="search" alt="" />
        </div>
        <div class="more" @click="toast(message)">
          <img :src="threedots" alt="" />
        </div>
      </div>
      <div class="detail">
        <div class="img">
          <img :src="playListDetail.coverImgUrl + '?param=600?600'" alt="" />
        </div>
        <div class="content">
          <div class="name">{{ playListDetail.name }}</div>
          <div class="creator">
            <div class="head-portrait">
              <img :src="creator.avatarUrl" alt="" />
            </div>
            <div class="creator-name">
              <span>{{ creator.nickname }}</span>
            </div>
          </div>
          <div class="description">
            <span>{{ playListDetail.description }}</span>
          </div>
        </div>
        <div class="icons">
          <div class="commments item">
            <img :src="comment" alt="" />
            <span>{{ playListDetail.commentCount }}</span>
          </div>
          <div class="share item">
            <img :src="share" alt="" />
            <span>{{ playListDetail.shareCount }}</span>
          </div>
          <div class="download item">
            <img :src="download" alt="" />
            <span>Download</span>
          </div>
          <div class="multi-pick item">
            <img :src="multPick" alt="" />
            <span>Multi-pick</span>
          </div>
        </div>
      </div>
    </div>
    <div class="songs">
      <div class="song-header">
        <div class="play-icon">
          <img :src="play" alt="" />
        </div>
        <div class="play-all">
          <span>{{ playAll }}</span>
        </div>
        <div class="fav">
          <span>{{ fav }}</span>
        </div>
      </div>
      <div
        class="song-lists"
        v-for="(item, index) in playListDetail.tracks"
        :key="index"
      >
        <div class="list">
          <div class="index">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="content">
            <div class="song-name">
              <span>
                {{ item.name }}
              </span>
            </div>
            <div class="ar">
              <span>
                {{ item.ar[0].name }}
              </span>
            </div>
          </div>
          <div class="play-icon">
            <img :src="gThreedots" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {playlistDetail} from 'api/find'
import {Toast} from 'vant'
export default {
  name: 'PlayList',
  data() {
    return {
      playListDetail: {},
      creator: {},

      leftArrow: require('assets/icons/playlist/left_arrow.svg'),
      comment: require('assets/icons/playlist/comment.svg'),
      download: require('assets/icons/playlist/download.svg'),
      gThreedots: require('assets/icons/playlist/g_threedots.svg'),
      threedots: require('assets/icons/playlist/threedots.svg'),
      play: require('assets/icons/playlist/play.svg'),
      multPick: require('assets/icons/playlist/mult_pick.svg'),
      share: require('assets/icons/playlist/share.svg'),
      search: require('assets/icons/playlist/search.svg'),
      message: '功能等待开发'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toast(message) {
      Toast(message)
    }
  },
  computed: {
    playAll() {
      return 'Play all(' + this.playListDetail.trackCount + ' tracks)'
    },
    fav() {
      return `+ Fav(${this.playListDetail.subscribedCount})`
    }
  },
  created() {
    playlistDetail(this.$route.params.play_list_id).then(res => {
      if (res.data.code === 200) {
        this.playListDetail = res.data.playlist
        this.creator = res.data.playlist.creator
      }
    })
  },
  activated() {
    playlistDetail(this.$route.params.play_list_id).then(res => {
      if (res.data.code === 200) {
        this.playListDetail = res.data.playlist
        this.creator = res.data.playlist.creator
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  overflow: hidden;
  width: 360px;
  .top {
    height: 270px;
    width: 360px;
    background-image: linear-gradient(
      to bottom,
      rgb(48, 67, 73),
      rgb(104, 101, 82)
    );
    .header {
      height: 46px;
      width: 360px;
      .left-arrow {
        float: left;
        margin: 10px 0 0 18px;
        width: 20px;
        height: 20px;

        img {
          height: 20px;
          width: 20px;
          margin-top: 3px;
        }
      }
      .title {
        float: left;
        margin: 10px 0 0 15px;
        width: 210px;
        height: 26px;
        span {
          font-size: 16px;
          line-height: 26px;
          color: white;
        }
      }
      .search {
        float: left;
        margin: 10px 0 0 10px;
        height: 26px;
        width: 26px;
        img {
          height: 26px;
          width: 26px;
        }
      }
      .more {
        float: right;
        margin: 10px 16px 0 0;
        height: 26px;
        width: 20px;
        img {
          height: 26px;
          width: 20px;
        }
      }
    }
    .detail {
      padding: 14px 15px 0 15px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      height: 130px;
      width: 360px;
      box-sizing: border-box;
      .img {
        height: 130px;
        width: 130px;
        img {
          height: 130px;
          width: 130px;
        }
      }
      .content {
        height: 130px;
        width: 180px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .name {
          height: 50px;
          width: 160px;
          font-size: 16px;
          display: inline-block;
          line-height: 25px;
          color: white;
        }
        .creator {
          width: 180px;
          height: 30px;
          font-size: 10px;
          color: #f2f2f2;
          .head-portrait {
            display: inline-block;
            vertical-align: middle;
            img {
              height: 30px;
              width: 30px;
              border-radius: 50%;
            }
          }
          .creator-name {
            display: inline-block;
            margin-left: 3px;
            line-height: 30px;
            span {
              color: #e6e6e6;
            }
          }
        }
        .description {
          width: 180px;
          height: 30px;
          display: inline-block;
          line-height: 15px;
          font-size: 8px;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #d9d9d9;
          }
        }
      }
      .icons {
        height: 80px;
        width: 330px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .item {
          height: 50px;
          width: 60px;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          align-items: center;
          img {
            height: 20px;
            width: 20px;
          }
          span {
            font-size: 6px;
            color: #d9d9d9;
          }
        }
      }
    }
  }
  .songs {
    .song-header {
      height: 50px;
      border-radius: 5px;
      .play-icon {
        float: left;
        margin-top: 15px;
        margin-left: 15px;
        img {
          height: 20px;
          width: 20px;
        }
      }
      .play-all {
        float: left;
        margin-left: 20px;
        span {
          line-height: 50px;
          font-size: 16px;
          color: black;
        }
      }
      .fav {
        float: right;
        height: 40px;
        width: 100px;
        border-radius: 20px;
        background-color: red;
        margin-top: 5px;
        margin-right: 5px;
        display: flex;
        justify-content: center;
        span {
          font-size: 14px;
          line-height: 40px;
          color: white;
          text-align: center;
        }
      }
    }
    .song-lists {
      padding: 0 15px;
      box-sizing: border-box;
      .list {
        width: 330px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .index {
          height: 15px;
          width: 15px;
          span {
            font-size: 12px;
          }
        }
        .content {
          width: 270px;
          height: 40px;
          margin-top: 5px;
          .song-name {
            height: 25px;
            color: black;
            span {
              line-height: 25px;
              font-size: 14px;
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
        .play-icon {
          height: 50px;
          width: 20px;
          img {
            margin-top: 15px;
            height: 20px;
            width: 20px;
          }
        }
      }
    }
  }
}
</style>
