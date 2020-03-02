import myaxios from '@/util/myAxios'
const module = {
//   开启子module的命名空间
  namespaced: true,
  state: {
    cinemasList: []
  },
  // 异步处理
  actions: {
    getCinemaAction (store, id) {
      myaxios.request({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=8779020`,
        method: 'get',
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list',
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1583129196382252089476","bc":${id}}`
        }
      }).then(res => {
        // console.log('影院数据请求', res.data)
        // 提交到mutations中
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  },
  // 唯一修改共享状态的地方
  mutations: {
    // 第一个参数默认为state(为什么？)，因为需要在mutations中修改公共的状态
    // 第二个参数是异步请求得到的数据
    // 存数据
    setCinemaList (state, data) {
      // console.log(data, state)
      // 将开始为空的cinemaList改变
      state.cinemasList = data
    }
  },
  // 对共享状态进行加工处理，类似于computed属性，处理后的数据可以复用
  getters: {
    recommendList (state) {
      return state.cinemasList.slice(0, 5)
    }
  }
}
export default module
