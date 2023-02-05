import axios from 'axios'
import {Message} from 'element-ui'

// 创建axios实例
let service = axios.create({
    // 设置axios请求的基础地址
    baseURL:process.env.VUE_APP_BASE_API, //当执行yarn serve时 就会走.env.development,当开发环境以/api开头 就会跨域
    // 设置超时
    timeout:5000,
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response=>{
    // 响应成功的回调函数

    //response.data 是axios默认加了一层data
    let {success,message,data} = response.data
    //要根据success的成功与否决定下面的操作
    if(success){
        // 成功就返回数据
        return data
    }else{
        // 失败就提示错误信息
        Message.error(message)

        // axios返回的是promise对象  promise().then().catch()
        // new Error(message)  没有错误信息就new一个
        // 此时业务已经错误了，不能进入then，应该进入catch
        return Promise.reject(new Error(message))
    }
},error=>{
    // 响应失败的回调函数

    // 提示错误信息
    Message.error(error.message)
    // 返回执行错误 让当前的执行链跳出成功 直接进入catch
    return Promise.reject(error)
})
export default service