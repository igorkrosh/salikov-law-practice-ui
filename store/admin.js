
export const state = () => ({
    courses: false,
    webinars: [],
})

export const getters = {
    COURSES: state => {
        return state.courses
    },
    WEBINARS: state => {
        return state.webinars
    }
}

export const mutations = {
    SET_COURSES: (state, payload) => {
        state.courses = payload;
    },
    SET_WEBINARS: (state, payload) => {
        state.webinars = payload;
    }
}

export const actions = {
    SET_COURSES: (context, payload) => {
        context.commit('SET_COURSES', payload);
    },
    LOAD_COURSES: async function (context, payload) {
        let courses = await this.$axios.get('/api/course/get-by-user')

        context.commit('SET_COURSES', courses.data);
    },
    SET_WEBINARS: (context, payload) => {
        context.commit('SET_WEBINARS', payload)
    },
    LOAD_WEBINARS: async function (context, payload) {
        let webinars = await this.$axios.get('/api/webinar/get-by-user')

        context.commit('SET_WEBINARS', webinars.data)
    }
}
