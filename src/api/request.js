import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://www.wshengxing.com:3000',
  timeout: 5000
})

instance.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.log(err)
  }
)

export default instance