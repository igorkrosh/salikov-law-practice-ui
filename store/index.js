export const state = () => ({
    user: {},
    progress: [],
    webinar: [],
    results: [],
    recomendations: [],
    journal: [],
    achievements: [],
    done: [],
    pagetitle: '',
    disableBgWhite: false,
    loading: false,
    calendar: [],
    notifications: [],
})

export const getters = {
    USER: state => {
        return state.user;
    },
    PROGRESS: state => {
        return state.progress;
    },
    WEBINAR: state => {
        return state.webinar;
    },
    RESULTS: state => {
        return state.results;
    },
    RECOMENDATIONS: state => {
        return state.recomendations;
    },
    JOURNAL: state => {
        return state.journal;
    },
    ACHIEVEMENTS: state => {
        return state.achievements;
    },
    PAGETITLE: state => {
        return state.pagetitle;
    },
    DONE: state => {
        return state.done;
    },
    DISABLE_BG_WHITE: state=> {
        return state.disableBgWhite;
    },
    LOADING: state => {
        return state.loading
    },
    CALENDAR: state => {
        return state.calendar;
    },
    NOTIFICATIONS: state => {
        return state.notifications;
    },
    ALL_USER_COURSES: state => {
        return state.progress.concat(state.done)
    },
}

export const mutations = {
    SET_USER: (state, payload) => {
        state.user = payload;
    },
    SET_PROGRESS: (state, payload) => {
        state.progress = payload;
    },
    SET_WEBINAR: (state, payload) => {
        state.webinar = payload;
    },
    SET_RESULTS: (state, payload) => {
        state.results = payload;
    },
    SET_RECOMENDATIONS: (state, payload) => {
        state.recomendations = payload;
    },
    SET_JOURNAL: (state, payload) => {
        state.journal = payload;
    },
    SET_ACHIEVEMENTS: (state, payload) => {
        state.achievements = payload;
    },
    SET_PAGETITLE: (state, payload) => {
        state.pagetitle = payload;
    },
    SET_DONE: (state, payload) => {
        state.done = payload;
    },
    SET_DISABLE_BG_WHITE: (state, payload) => {
        state.disableBgWhite = payload;
    },
    SET_LOADING: (state, payload) => {
        state.loading = payload;
    },
    SET_CALENDAR: (state, payload) => {
        state.calendar = payload;
    },
    SET_NOTIFICATIONS: (state, payload) => {
        state.notifications = payload;
    }
}

export const actions = {
    SET_USER: (context, payload) => {
        context.commit('SET_USER', payload);
    },
    LOAD_PROFILE: async function (context, payload) {
        let profile = await this.$axios.get('/api/profile')
        
        context.commit('SET_USER', profile.data.user);
        
        //context.commit('SET_PROGRESS', profile.data.progress);
        context.commit('SET_WEBINAR', profile.data.webinar);
        context.commit('SET_RESULTS', profile.data.results);
        context.commit('SET_JOURNAL', profile.data.journal);
        context.commit('SET_ACHIEVEMENTS', profile.data.achievements);
        //context.commit('SET_DONE', profile.data.done);
    },
    LOAD_RECOMENDATIONS: async function (context, payload) {
        let recomendations = await this.$axios.get('/api/course/recomendations')

        context.commit('SET_RECOMENDATIONS', recomendations.data);
    },
    SET_PAGETITLE: (context, payload) => {
        context.commit('SET_PAGETITLE', payload);
    },
    SET_DISABLE_BG_WHITE: (content, payload) => {
        content.commit('SET_DISABLE_BG_WHITE', payload);
    },
    SET_LOADING: (context, payload) => {
        context.commit('SET_LOADING', payload);
    },
    SET_CALENDAR: (content, payload) => {
        content.commit('SET_CALENDAR', payload);
    },
    LOAD_CALENDAR: async function (content, payload) {
        let calendar = await this.$axios.$get('/api/user/calendar');

        content.commit('SET_CALENDAR', calendar);
    },
    SET_NOTIFICATIONS: (context, payload) => {
        context.commit('SET_NOTIFICATIONS', payload)
    },
    LOAD_NOTIFICATIONS: async function (context, payload) {
        let notifications = await this.$axios.$get('/api/notification/get')

        context.commit('SET_NOTIFICATIONS', notifications)
    },
    LOAD_PROGRESS: async function (context, payload) {
        let response = await this.$axios.$get('/api/user/progress')
        console.log(response)
        context.commit('SET_PROGRESS', response.progress);
        context.commit('SET_DONE', response.done);
    }
}