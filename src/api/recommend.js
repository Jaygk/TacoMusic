import request from './request'

// 获取轮播图列表
export function getBanner() {
  return request({
    url: '/banner',
    params: {
      type: 1
    }
  })
}

// 获取推荐歌单列表
export function getHotList() {
  return request({
    url: '/top/playlist',
    params: {
      limit: 30,
      order: 'hot'
    }
  })
}

// 获取歌单详情
export function getRecommendDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

