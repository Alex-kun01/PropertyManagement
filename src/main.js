// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://wy.scfsll.com:8090' //'http://47.108.80.252:8090' // '192.168.31.142:8090'
    // 'http://47.108.80.252:8090' //
import store from './store/index'
import qs from 'qs'

require("./assets/base64")
var RongIMLib = window.RongIMLib


// 全局守卫
router.beforeEach((to, from, next) => {
    let authority = window.localStorage.getItem('authority')
    let role = window.localStorage.getItem('role')
    console.log('普通权限', authority)
    console.log('超级权限', role)

    if (to.path == '/') {
        next()
    } else {
        if (!window.localStorage.getItem('userName')) {
            alert('您还没有登陆，请登录')
            router.push('/')
        } else {
            next()
        }

    }
    if (!authority) return

    //财务管理
    if (to.meta.role == '财务管理' && authority.includes('财务管理') || role === 1) {
        console.log('通过财务管理')
        next()
    }

    //用户管理
    else if (to.meta.role == '用户管理' && authority.includes('用户管理') || role === 1) {
        console.log('通过用户管理')
        next()

    }

    //房屋管理
    else if (to.meta.role == '房屋管理' && authority.includes('房屋管理') || role === 1) {
        console.log('通过房屋管理')
        next()

    }

    //系统消息
    else if (to.meta.role == '系统消息' && authority.includes('系统消息') || role === 1) {
        console.log('通过系统消息')
        next()

    }

    //门禁管理
    else if (to.meta.role == '门禁管理' && authority.includes('门禁管理') || role === 1) {
        console.log('通过门禁管理')
        next()

    }

    //车辆管理
    else if (to.meta.role == '车辆管理' && authority.includes('车辆管理') || role === 1) {
        console.log('通过车辆管理')
        next()

    }

    //硬件管理
    else if (to.meta.role == '硬件管理' && authority.includes('硬件管理') || role === 1) {
        console.log('通过硬件管理')
        next()

    }
    //APP管理
    else if (to.meta.role == 'APP管理' && authority.includes('APP管理') || role === 1) {
        console.log('通过APP管理')
        next()
    }

    //权限管理
    else if (to.meta.role == '权限管理' && authority.includes('权限管理') || role === 1) {
        console.log('通过财务管理')
        next()

    } else if (to.meta.role == '登录' || to.meta.role == '首页' || to.meta.role == '票据') {
        console.log('通过财务管理')
        next()

    } else {
        router.replace('/showpage')
        alert('对不起您还没有该权限')
    }



})


Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})