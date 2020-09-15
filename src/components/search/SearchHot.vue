<template>
  <div class="search-hot">
    <div class="header">
      热搜榜
    </div>
    <div class="search-word-container">
      <div
        class="search-word"
        v-for="(item, index) of hotData"
        :key="item.searchWord"
        @click="toSearchResult(item.searchWord)"
      >
        <span class="index" ref="index">
          {{ index + 1 }}
        </span>
        <span class="word">
          {{ item.searchWord }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchHot} from 'api/find'
export default {
  name: 'SearchHot',
  data() {
    return {
      hotData: []
    }
  },
  methods: {
    toSearchResult(inputText) {
      if (inputText) {
        this.$router.push({
          path: `/search_result/${inputText}`,
          params: {
            keyword: inputText
          }
        })
      }
    }
    // //给标号1 2 3 染上红色
    // addRed(){
    //   // debugger
    //   let dom = this.$refs.index
    //   for(let i = 0; i < 3; i++){
    //     dom[i].style.color = 'red'
    //   }
    // }
  },
  created() {
    getSearchHot().then(res => {
      this.hotData = res.data.data.slice(0, 20)
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  line-height: 40px;
  display: inline-block;
  height: 40px;
  width: 330px;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(200, 200, 200);
}
.search-word-container {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;

  .search-word {
    line-height: 30px;
    height: 30px;
    width: 165px;
    font-size: 16px;
    margin-bottom: 8px;
    .index {
      margin: 0 6px 0 5px;
      & :nth-child(3){
        color: red;
      }
    }
  }
  //   .search-word {
  //   & :nth-child(-n + 3) {
  //     .index {
  //       color: red;
  //     }
  //   }
  // }
}

.search-word-container {
  .search-word:nth-child(-n+3) {
    .index {
      color: red;
    }
  }

}


</style>
