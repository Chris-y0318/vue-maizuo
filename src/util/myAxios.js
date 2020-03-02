import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000
  // headers: {
  //   // 放请求头的公共部分
  //   'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1582200420167503724773","bc":"310100"}'
  // }
})
// 导出该模块
export default instance
