const module = {
  // 开启子module的命名空间
  namespaced: true,
  state: {
    isNavBarShow: true
  },
  mutations: {
    // 将state对象作为形参传过来
    hide (state) {
      // console.log('hide')
      state.isNavBarShow = false
    },
    show (state) {
      // console.log('show')
      state.isNavBarShow = true
    }
  }
}
export default module
