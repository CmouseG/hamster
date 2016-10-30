import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
    switch_logger: false
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
