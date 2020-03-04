import request from './request'

// 获取歌曲url
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}