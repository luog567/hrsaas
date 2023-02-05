import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

// 状态
let state = {
  //设置token为共享状态
  //一初始化vuex时就从缓存中读取token
  token: getToken()
}
// 修改状态
let mutations = {
  // 设置token
  setToken(state, token) {
    //将数据设置给vuex
    state.token = token
    //当vuex数据发生变化时 把token同步给缓存
    setToken(token)
  },

  // 删除token
  removeToken(state) {
    // 将vuex的token删除
    state.token = null
    // 删除本地缓存token
    removeToken()
  }
}
// 执行异步
let actions = {
  // 登录action  data是需要传入的参数对象 mobile password
  async login(context, data) {
    // 调用api登录接口
    let {result} = await login(data)
    if(result.success){
      // 如果结果为true，表示登录成功
      context.commit('setToken',result.data)
    }
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}