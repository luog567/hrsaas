// 权限拦截在路由跳转  导航守卫

import router from '@/router'
import store from '@/store'  //引入store实例  和组件中的this.$store是一回事
import nprogress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css'

// 定义白名单
let whiteList = ['/login', '/404']

// 前置守卫
// next是前置守卫必须执行的钩子， next必须执行  如果不执行 页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
router.beforeEach((to, from, next) => {
    // 开启进度条
    nprogress.start()
    if (store.getters.token) {
        // 如果有token
        if (to.path === '/login') {
            // 如果要访问的是 登录页
            next('/') //跳转到主页
        } else {
            next()
        }
    } else {
        // 没有token的情况下
        if (whiteList.indexOf(to.path) > -1) {
            // 表示要去的地址在白名单
            next()
        } else {
            next('/login')
        }
    }
    nprogress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
    // 关闭进度条
    nprogress.done()
})