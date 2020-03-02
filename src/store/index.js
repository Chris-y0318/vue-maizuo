import Vue from 'vue'
import Vuex from 'vuex'
// import myaxios from '@/util/myAxios'
// 引入子module
import cinema from './module/cinemasListModule'
import navBar from './module/navBarShowModule'
import city from './module/cityModule'
// 引入vuex状态持久化插件
import createPersistedState from 'vuex-persistedstate'
// 注册Vuex插件
Vue.use(Vuex)

// const store = new Vuex.Store({
//   // 共享的状态
//   state: {
//     isNavBarShow: true,
//     // cinemaList就成了公共的状态
//     cinemasList: []
//   },
//   // 唯一修改共享状态的地方
//   mutations: {
//     // 将state对象作为形参传过来
//     hide (state) {
//       // console.log('hide')
//       state.isNavBarShow = false
//     },
//     show (state) {
//       // console.log('show')
//       state.isNavBarShow = true
//     },
//     // 第一个参数默认为state(为什么？)，因为需要在mutations中修改公共的状态
//     // 第二个参数是异步请求得到的数据
//     // 存数据
//     setCinemaList (state, data) {
//       // console.log(data, state)
//       // 将开始为空的cinemaList改变
//       state.cinemasList = data
//     }
//   },
//   // 异步处理
//   actions: {
//     getCinemaAction (store) {
//       myaxios.request({
//         url: '/gateway?cityId=310100&ticketFlag=1&k=8779020',
//         method: 'get',
//         headers: {
//           'X-Host': 'mall.film-ticket.cinema.list'
//         }
//       }).then(res => {
//         console.log('影院数据请求', res.data)
//         // 提交到mutations中
//         store.commit('setCinemaList', res.data.data.cinemas)
//       })
//     }
//   },
//   // 对共享状态进行加工处理，类似于computed属性，处理后的数据可以复用
//   getters: {
//     recommendList (state) {
//       return state.cinemasList.slice(0, 5)
//     }
//   }
// })
const store = new Vuex.Store({
  plugins: [createPersistedState({
    // storage: window.localStorage,
    reducer (data) {
      return {
        city: data.city
      }
    }
  })],
  // 共享的状态
  state: {

  },
  actions: {

  },
  mutations: {

  },
  getters: {

  },
  // 合并到唯一的一个store中
  modules: {
    cinema,
    navBar,
    city
  }
})
export default store

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
