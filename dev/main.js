import Vue from 'vue'
import VueRouter from 'vue-router'
import hamster from 'hamster'
import App from './App'
import Home from './Home'

Vue.config.debug = true
require('../src/themes/hamster.' + __THEME + '.styl')
hamster.theme.set(__THEME)

Vue.use(VueRouter)
Vue.use(hamster)
// new Vue({
//     render: h => h(App)
// }).$mount('#app')

const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Home
        }
    ]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

hamster.start(() => {})
