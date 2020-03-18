import request from './request'

// 获取热搜列表
export function getHotSearch() {
  return request({
    url: '/search/hot/detail',
    withCredentials: true
  })
}

// 搜索
export function search(keywords, limit, offset) {
  return request({
    url: '/search',
    params: {
      keywords,
      limit,
      offset
    },
    withCredentials: true
  })
}

// 默认搜索关键词
export function getSearchDefault() {
  return request({
    url: '/search/default',
    withCredentials: true
  })
}

// 获取歌曲详情
export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    },
    withCredentials: true
  })
}

// 获取搜索歌曲列表
export function getSearchList(arr) {
  let list = []
  // const res = await search(keywords, limit, offset)
  // const arr = res.result.songs

  for (let item of arr) {
    let obj = {}

    obj.name = item.name
    obj.id = item.id
    obj.artist = item.artists[0].name
    obj.album = item.album.name

    list.push(obj)
  }

  return list
}
