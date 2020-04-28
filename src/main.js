// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://47.108.80.252:8090'
    // axios.defaults.baseURL = 'http://192.168.31.111:8090'  服务器地址 http://47.108.80.252:8090
    // axios.defaults.baseURL = 'http://www.hbzayun.com'
import store from './store/index'

// 全局守卫
router.beforeEach((to, from, next) => {

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

})


Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})