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


//不需要登陆的推荐音乐
export function recommendMusicData() {
  return request({
    url: '/personalized/newsong'
  })
}

//不需要登录的推荐歌单

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
