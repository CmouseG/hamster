import * as api from '../../api'

const mutationsTypes = {
    SET_A_INPUT: 'GET_A_INPUT',
    SET_NAME: 'SET_NAME'
}

const state = {
    fromData: {}
}

const mutations = {
    [mutationsTypes.SET_A_INPUT]: (state, { data }) => {
        state.fromData = {...data}
    },
    [mutationsTypes.SET_NAME]: (state, name) => {
        state.fromData.name = name
    }
}

const actions = {
    getAInputA: ({ commit }) => {
        api.getAInput().then(data => {
            commit(mutationsTypes.SET_A_INPUT, {
                data
            })
        })
    },
    updateName: ({ dispatch, commit }, e) => {
        commit(mutationsTypes.SET_NAME, e.target.value)
    }
}

const getters = {
    getAInputG: state => state.fromData
}

export default {
    state,
    mutations,
    actions,
    getters
}
