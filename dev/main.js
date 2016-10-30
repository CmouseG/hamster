import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import hamster from 'hamster'

import store from './store'
import router from './router'
import App from './App'
import filters from './filters'
import Logger from './plugins/logger/logger.class'

Vue.config.debug = true
// 勿打开，否则编译stylus会出错，仅在测试的时候打开
// let __THEME = 'mat'

require('../src/themes/hamster.' + 'mat' + '.styl')
hamster.theme.set('mat')

Vue.use(VueTouch)
Vue.use(VueResource)
Vue.use(hamster)

// 拦截器interceptors
// Vue.http.interceptors.push((request, next) => {
//     // 请求发送前的处理逻辑
//     next((response) => {
//         // 请求发送后的处理逻辑
//         Logger.getInstance(response.data[Math.floor(Math.random() * response.data.length)])
//         return response
//     })
// })
// Vue.http.get('./statics/data/logger.json')
let data = require('./statics/data/logger.json')
Logger.getInstance(data[Math.floor(Math.random() * data.length)])

new Vue({
    store,
    router,
    filter: {
        filters
    },
    render: h => h(App)
}).$mount('#app')

hamster.start(() => {})
