import request from './request'

export function getBanner() {
  return request({
    url: '/banner',
    params: {
      type: 1
    }
  })
}

export function getHotList() {
  return request({
    url: '/top/playlist',
    params: {
      limit: 30,
      order: 'hot'
    }
  })
}
