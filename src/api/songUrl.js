import request from './request'

export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}