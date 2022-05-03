export const state = () => ({
    test: 'test'
})

export const getters = {
    TEST: state => {
        return state.test;
    }
}

export const mutations = {
    SET_TEST: (state, payload) => {
        state.test = payload;
    }
}

export const actions = {
    SET_TEST: (state, payload) => {
        context.commit('SET_TEST', payload);
    }
}