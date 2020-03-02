const module = {
  namespaced: true,
  state: {
    cityId: '110100',
    cityName: '北京'
  },
  actions: {

  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, id) {
      state.cityId = id
    }
  },
  getters: {

  }
}
export default module
