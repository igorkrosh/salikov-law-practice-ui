
export const state = () => ({
    courses: false
})

export const getters = {
    COURSES: state => {
        return state.courses
    }
}

export const mutations = {
    SET_COURSES: (state, payload) => {
        state.courses = payload;
    },
}

export const actions = {
    SET_COURSES: (context, payload) => {
        context.commit('SET_COURSES', payload);
    },
    LOAD_COURSES: async function (context, payload) {
        let courses = await this.$axios.get('/api/course/get-by-user')

        context.commit('SET_COURSES', courses.data);
    }
}
