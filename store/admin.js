
export const state = () => ({
    courses: false,
    webinars: [],
    streams: [],
    tasks: [],
})

export const getters = {
    COURSES: state => {
        return state.courses
    },
    WEBINARS: state => {
        return state.webinars
    },
    STREAMS: state => {
        return state.streams
    },
    TASKS: state => {
        return state.tasks
    }
}

export const mutations = {
    SET_COURSES: (state, payload) => {
        state.courses = payload;
    },
    SET_WEBINARS: (state, payload) => {
        state.webinars = payload;
    },
    SET_STREAMS: (state, payload) => {
        state.streams = payload;
    },
    SET_TASKS: (state, payload) => {
        state.tasks = payload;
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
    },
    SET_STREAMS: (context, payload) => {
        context.commit('SET_STREAMS', payload)
    },
    LOAD_STREAMS: async function (context, payload) {
        let stream = await this.$axios.get('/api/stream/get')

        context.commit('SET_STREAMS', stream.data)
    },
    SET_TASKS: (context, payload) => {
        context.commit('SET_TASKS', payload)
    },
    LOAD_TASKS: async function (context, payload) {
        let tasks = await this.$axios.get(`/api/task/check/get`)

        context.commit('SET_TASKS', tasks.data);
    },
}
