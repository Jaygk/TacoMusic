import request from './request'

// 获取热搜列表
export function getHotSearch() {
  return request({
    url: '/search/hot/detail'
  })
}

// 搜索
function search(keywords) {
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

// 获取歌曲详情
export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取搜索歌曲列表
export async function getSearchList(keywords) {
  let list = []
  const res = await search(keywords)
  const arr = res.result.songs

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
