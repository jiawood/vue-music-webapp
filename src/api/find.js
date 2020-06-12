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
