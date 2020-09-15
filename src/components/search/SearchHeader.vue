<template>
  <div class="search-header">
    <div class="top">
      <img :src="leftArrow"  @click="goBack" />
      <input
        type="text"
        name=""
        id=""
        :placeholder="defaultInput"
        v-model="inputText"
      />
      <van-icon
        name="cross"
        class="cross"
        size="25px"
        @click="clearInput"
        v-show="inputText"
      />
    </div>
    <div class="search-reference" v-show="inputText">
      <div class="search-item" @click="toSearchResult(inputText)">
        <van-icon name="search" class="icon" size="25px" />
        <span class="text">{{ inputText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getDefaultInput} from 'api/find'
export default {
  name: 'SearchHeader',
  data() {
    return {
      leftArrow: require('assets/icons/left-arrow.svg'),
      defaultInput: '',
      inputText: ''
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
    },
    goBack(){
      this.$router.go(-1)
    },
    clearInput(){
      this.inputText = ''
    }
  },
  created() {
    getDefaultInput().then(res => {
      this.defaultInput = res.data.data.showKeyword
    })
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  position: relative;
  .top {
    height: 40px;
    width: 330px;
    display: flex;
    flex-direction: row;
    position: relative;
    img {
      height: 30px;
      width: 30px;
      padding-right: 10px;
      padding-top: 10px;
    }
    input {
      height: 40px;
      width: 295px;
      padding-top: 10px;
      box-sizing: border-box;
      border: none;
      line-height: 30px;

      border-bottom: 1px solid rgb(36, 36, 36);
    }
    .cross {
      position: absolute;
      right: 0;
      top: 0;
      height: 25px;
      width: 25px;
      padding-top: 15px;
    }
  }
  .search-reference {
    margin-top: 15px;
    width: 330px;
    xbox-shadow: 0 0 0 2px gray;
    height: 100px;
    background-color: rgb(245,245,245);
    position: absolute;
    .search-item {
      padding-top: 15px;
      height: 40px;
      width: 330px;
      display: inline-block;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid gray;
      .icon {
        float: left;
        left: 10px;
        top: 7px;
      }
      span {
        display: inline-block;
        padding-left: 20px;
      }
    }
  }
}
</style>
