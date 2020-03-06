import request from './request'

// 获取排行榜列表
function getTopList() {
  return request({
    url: '/toplist/detail'
  })
}

export async function getFinallyTopList() {
  const res = await getTopList()
  const arr = res.list

  let officialList = []
  let worldList = []
  for (let item of arr) {
    let obj = {}

    obj.name = item.name
    obj.id = item.id
    obj.desc = item.description
    obj.picUrl = item.coverImgUrl
    obj.playCount = item.playCount
    obj.update = item.updateFrequency
    obj.songList = item.tracks

    if (obj.songList.length > 0) {
      officialList.push(obj)
    } else {
      worldList.push(obj)
    }
  }

  return [officialList, worldList]
}
