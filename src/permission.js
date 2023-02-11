// 权限拦截在路由跳转  导航守卫

import router from '@/router'
import store from '@/store'  //引入store实例  和组件中的this.$store是一回事
import nprogress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css'

// 不需要导出  在main.js已经导入了permission.js  只需要让代码执行即可

// 定义白名单
let whiteList = ['/login', '/404']

// 前置守卫
// next是前置守卫必须执行的钩子， next必须执行  如果不执行 页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    nprogress.start()
    if (store.getters.token) {
        // 只有在有token的情况下，才能获取资料
        // 如果有token
        if (to.path === '/login') {
            // 如果要访问的是 登录页
            next('/') //跳转到主页   有token不需要处理
        } else {
            // 只有放过的时候采取获取用户资料
            // 是每次都获取吗？
            // 如果当前vuex中有用户的资料id  表示已经有资料了 就不需要再次获取  如果没有id才去获取
            if (!store.getters.userId) {
                // 如果说后续  需要根据用户资料获取数据的话，这里必须改成 同步
                await store.dispatch('user/getUserInfo')
            }
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