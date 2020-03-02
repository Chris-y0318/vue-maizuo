import Vue from 'vue'
// 日期过滤器
import moment from 'moment'
Vue.filter('dateFilter', function (data) {
//   console.log(data)
  // 时间戳单位是毫秒数
  var str = moment(data * 1000).format('dddd MM DD')
  return str
})
// 主演人员过滤器
Vue.filter('actorsFilter', function (data) {
//   console.log(data)
  // console.log(data.map(item => item.name).join(' '))
  return data.map(item => item.name).join(' ')
})
