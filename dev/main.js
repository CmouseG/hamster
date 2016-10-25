import Vue from 'vue'
import VueTouch from 'vue-touch'
import hamster from 'hamster'

import router from './router'
import App from './App'

Vue.config.debug = true
// 切记勿打开，否则编译stylus会出错，各种问题，仅在测试的时候打开
// let __THEME = 'mat'

require('../src/themes/hamster.' + __THEME + '.styl')
hamster.theme.set(__THEME)

Vue.use(VueTouch)
Vue.use(hamster)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

hamster.start(() => {})
