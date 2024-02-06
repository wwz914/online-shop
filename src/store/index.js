import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginVisisble:undefined,
    isSigninVisisble:undefined,
    pageIndex:1,
    checks:[]
  },
  getters: {
  },
  mutations: {
    changePage(state,payload){
      state.pageIndex=payload
    },
    changeLogin(state,payload){
      state.isLoginVisisble=payload
    },
    changeRegister(state,payload){
      state.isSigninVisisble=payload
    },
    changeChecks(state,payload){
      state.checks=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
