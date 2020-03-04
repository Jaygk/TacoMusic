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