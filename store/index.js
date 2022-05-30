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
    loading: false
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
    }
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
}

export const actions = {
    SET_USER: (context, payload) => {
        context.commit('SET_USER', payload);
    },
    LOAD_PROFILE: async function (context, payload) {
        let profile = await this.$axios.get('/api/profile')
        
        context.commit('SET_USER', profile.data.user);
        
        context.commit('SET_PROGRESS', profile.data.progress);
        context.commit('SET_WEBINAR', profile.data.webinar);
        context.commit('SET_RESULTS', profile.data.results);
        context.commit('SET_JOURNAL', profile.data.journal);
        context.commit('SET_ACHIEVEMENTS', profile.data.achievements);
        context.commit('SET_DONE', profile.data.done);
    },
    LOAD_RECOMENDATIONS: (context, payload) => {
        let recomendations = [
            {
                date: '07.04.2022',
                duration: '2 недели',
                title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                lectors: 'Иванов А.А.',
                type: 'Курс',
                image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
            },
            {
                date: '07.04.2022',
                duration: '2 недели',
                title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                lectors: 'Иванов А.А.',
                type: 'Курс',
                image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
            },
            {
                date: '07.04.2022',
                duration: '2 недели',
                title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                lectors: 'Иванов А.А.',
                type: 'Курс',
                image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg'
            }
        ]

        context.commit('SET_RECOMENDATIONS', recomendations);
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
}