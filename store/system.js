export const state = () => ({
    loading: false
})

export const getters = {
    LOADING: state => {
        return state.loading
    }
}

export const mutations = {
    SET_LOADING: (state, payload) => {
        state.loading = payload;
    },
}

export const actions = {
    SET_LOADING: (context, payload) => {
        context.commit('SET_LOADING', payload);
    },
}