import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginVisisble:undefined,
    pageIndex:1
  },
  getters: {
  },
  mutations: {
    changePage(state,payload){
      state.pageIndex=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
