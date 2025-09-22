import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
    token : '',
  },
  getters: {
    getToken: state => state.token,
    getUserData: state=>state.userData
  },
  mutations: {
  },
  actions: {
    setToken: ({ state }, value) => state.token = value,
    setUserToken: ({state},value)=> state.userData = value
  },
  modules: {
  }
})
