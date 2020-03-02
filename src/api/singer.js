import request from './request'

export function getSingers() {
  return request({
    url: '/toplist/artist'
  })
}

export function getSingerList(arr) {
  if (!String.prototype.localeCompare) return null
  let letters = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
  let zh = '阿八嚓哒妸发旮哈讥咔垃麻拏噢妑七呥扨它穵夕丫帀'.split('')
  let list = []
  let tempArr = []
  for (let j = 0; j < 15; j++) {
    tempArr.push(arr[j])
  }

  list.push({ letter: '热门', data: tempArr })

  letters.map((item, i) => {
    let cur = { letter: item, data: [] }
    arr.map(ele => {
      if (
        (ele.name.localeCompare(zh[i]) >= 0 &&
          ele.name.localeCompare(zh[i + 1]) < 0) ||
        ele.name.toUpperCase().indexOf(item) === 0
      ) {
        cur.data.push(ele)
      }
    })
    if (cur.data.length) {
      cur.data.sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
      list.push(cur)
    }
  })

  list[list.length - 1].data.splice(9)
  return list
}

export function getSingerDetail(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}

function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

export async function getFinallyDetail(arr) {
  let list = []

  for (let item of arr) {
    let obj = {}
    const res = await getSongUrl(item.id)
    obj.songUrl = res.data[0].url
    obj.name = item.name
    obj.id = item.id
    obj.artist = item.ar[0].name
    obj.alia = item.alia[0]
    obj.album = item.al.name
    obj.picUrl = item.al.picUrl

    list.push(obj)
  }

  return list
}
