import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
let state = {
  //设置token为共享状态
  //一初始化vuex时就从缓存中读取token
  token: getToken(),
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
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
  },

  // 设置用户信息
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result //这是响应式
    // state.userInfo = {...result}  这样也是响应式  属于浅拷贝
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
let actions = {
  // 登录action  data是需要传入的参数对象 mobile password
  async login(context, data) {
    // 调用api登录接口
    let result = await login(data)  //获取token
    context.commit('setToken', result) //设置token
    // 写入时间戳
    setTimeStamp() // 将当前的最新时间写入缓存
  },

  // 获取用户信息action
  async getUserInfo(context) {
    // 获取用户信息
    let result = await getUserInfo()
    // 为了获取头像   需要传入用户的id
    let baseInfo = await getUserDetailById(result.userId)
    // 将两个接口结果合并
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
    let baseResult = { ...result, ...baseInfo }
    // 设置用户信息  提交mutations
    context.commit('setUserInfo', baseResult)
    // 这里为什么要return ？ 这是为后面做权限时  埋下伏笔
    return result
  },

  // 登出action   登出里面的代码都是同步代码
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('removeUserInfo')
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}