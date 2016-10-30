import * as types from './mutation-types'

export default {
    setSwitchLogger: ({commit}, bool) => {
        commit(types.SWITCH_LOGGER, bool)
    }
}
