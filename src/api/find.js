import {request} from '@/utils/request'

export function getFindBanner() {
  return request({
    url: '/banner?type=1'
  })
}

export function getRecommendList() {
  return request({
    url: '/personalized?limit=6'
  })
}

//懂你的精选歌曲
export function getRecommend() {
  return request({
    url: '/top/playlist?limit=6&order=hot&cat=华语'
  })
}

//晚上好 音乐伴你回家
export function getRecommendNight() {
  return request({
    url: '/top/playlist?limit=6&order=hot&cat=夜晚'
  })
}

//不需要登陆的推荐音乐,热歌的歌单
export function recommendMusicData() {
  return request({
    url: '/playlist/detail?id=3778678'
  })
}

//不需要登录的推荐音乐2 飙升榜
export function recommendMusicData2() {
  return request({
    url: '/playlist/detail?id=19723756'
  })
}

export function recommendListNo() {
  return request({
    url: '/personalized'
  })
}

//详细的歌单信息(包含歌单里面的歌曲)
export function playlistDetail(id) {
  return request({
    url: '/playlist/detail?',
    params: {
      id: id
    }
  })
}

//暂时先不做这个功能
//歌曲详情页，主要是通过这个获取到歌曲的图片
//ids 是一个歌曲列表的字符串  id,id,id
export function songDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids: ids
    }
  })
}

//获取音乐的MP3文件
export function getSongUrl(id) {
  return request({
    url: '/song/url?',
    params: {
      id: id
    }
  })
}

//获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric?',
    params: {
      id: id
    }
  })
}

//获取排行榜数据
export function getRankIds() {
  return request({
    url: '/toplist'
  })
}

//获得热搜数据
export function getSearchHot() {
  return request({
    url: '/search/hot/detail'
  })
}

//默认的参数
export function getDefaultInput() {
  return request({
    url: '/search/default'
  })
}

//搜索建议,主要用来个得到歌单列表和部分歌曲
export function getSearchSuggestion(keywords) {
  return request({
    url: '/search/suggest?',
    params: {
      keywords
    },
    paramsSerializer: params => {
      // Sample implementation of query string building

      return 'keywords=' + '%20' + params.keywords
    }
  })
}

//搜索建议，得到单曲
export function getSearchSongs(keywords) {
  return request({
    url: '/search?',
    params: {
      keywords
    },
    paramsSerializer: params => {
      // Sample implementation of query string building

      return 'keywords=' + '%20' + params.keywords
    }
  })
}
