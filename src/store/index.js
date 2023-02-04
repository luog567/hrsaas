import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // modules 存放的vuex的子模块
  modules: {
    app,
    settings,
    user
  },
  // 开放了根级别的getters
  getters
})

export default store
