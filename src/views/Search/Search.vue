<template>
  <div class="search">
    <search-header></search-header>
    <search-hot></search-hot>
  </div>
</template>

<script>
import SearchHeader from 'components/search/SearchHeader'
import SearchHot from 'components/search/SearchHot'
export default {
  name: 'Search',
  components: {
    SearchHeader,
    SearchHot
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 360px;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
