import request from '@/utils/request'

/**
 * 登录接口封装
 */
export function login(data) {
    // request 等于axios  返回的是promise对象
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

/**
 * 获取用户基本资料
 */
export let getUserInfo = () => {
    return request({
        url:'/sys/profile',
        method:'post'
    })
}

/**
 * 获取员工基本信息  现在写它 完全是为了获取显示头像
 * axios 默认的请求方法是get
 */
export let getUserDetailById = (id)=>{
    return request({
        url:`/sys/user/${id}`
    })
}
