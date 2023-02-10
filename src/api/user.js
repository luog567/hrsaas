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

export function logout() {

}
