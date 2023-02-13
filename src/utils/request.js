import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600 //定义超时时间

// 创建axios实例
let service = axios.create({
    // 设置axios请求的基础地址
    baseURL: process.env.VUE_APP_BASE_API, //当执行yarn serve时 就会走.env.development,当开发环境以/api开头 就会跨域
    // 设置超时
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 请求成功的回调函数

    // 注入token
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
        // 只有在token存在的情况下  才有必要去检查时间戳是否超时
        if (IsCheckTimeOut()) {
            // 如果为true 表示token过期了

            // 登出操作
            store.dispatch('user/logout')
            // 跳转到登录页
            router.push('/login')
            // token过期，就不让程序往下走
            return Promise.reject(new Error('token超时了'))
        }
        // 判断是否有token  有token才注入到header中
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    //必须返回配置
    return config
}, error => {
    // 请求失败的回调函数
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    // 响应成功的回调函数

    //response.data 是axios默认加了一层data
    let { success, message, data } = response.data
    //要根据success的成功与否决定下面的操作
    if (success) {
        // 成功就返回数据
        return data
    } else {
        // 失败就提示错误信息
        Message.error(message)

        // axios返回的是promise对象  promise().then().catch()
        // new Error(message)  没有错误信息就new一个
        // 此时业务已经错误了，不能进入then，应该进入catch
        return Promise.reject(new Error(message))
    }
}, error => {
    // 响应失败的回调函数

    // 提示错误信息
    Message.error(error.message)
    // 返回执行错误 让当前的执行链跳出成功 直接进入catch
    return Promise.reject(error)
})

// 是否超时
// 超时逻辑  （当前时间 - 缓存中的时间）  判断是否大于时间差
function IsCheckTimeOut() {
    // 当前时间戳
    let currentTime = Date.now()
    // 缓存中的时间戳
    let timeStamp = getTimeStamp()
    // 当前时间和缓存时间单位是毫秒  /1000 化成 秒
    // Boolean
    return (currentTime - timeStamp) / 1000 > TimeOut

}
export default service