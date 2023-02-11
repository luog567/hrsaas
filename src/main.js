import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui' //导入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import * as directives from '@/directives' //导入自定义指令
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 注册全局自定义指令
// Object.keys()把对象转换成数组
Object.keys(directives).forEach(key => {
  //注册自定义指令
  Vue.directive(key, directives[key])

});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
