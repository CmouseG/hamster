import Vue from 'vue'
import VueRouter from 'vue-router'

import Modal from '../views/Modal'
import Dialog from '../views/Dialog'
import ActionSheet from '../views/ActionSheet'
import Tab from '../views/Tab'
import Logger from '../views/Logger'

// new Vue({
//     render: h => h(App)
// }).$mount('#app')
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/modal',
            component: Modal
        },
        {
            path: '/dialog',
            component: Dialog
        },
        {
            path: '/action-sheet',
            component: ActionSheet
        },
        {
            path: '/tab',
            component: Tab
        },
        {
            path: '/logger',
            component: Logger
        }

    ]
})

export default router
