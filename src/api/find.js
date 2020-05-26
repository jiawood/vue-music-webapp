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
