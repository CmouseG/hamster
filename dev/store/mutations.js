import * as types from './mutation-types'
export default {
    [types.SWITCH_LOGGER]: (state, bool) => {
        state.switch_logger = bool
    }
}
