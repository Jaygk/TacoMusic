import request from './request'

// 获取热搜列表
export function getHotSearch() {
  return request({
    url: '/search/hot/detail'
  })
}

// 搜索
export function search(keywords) {
  return request({
    url: '/search',
    params: {
      keywords
    }
  })
}

// 默认搜索关键词
export function getSearchDefault() {
  return request({
    url: '/search/default'
  })
}