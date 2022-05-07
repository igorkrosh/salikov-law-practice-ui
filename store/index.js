export const state = () => ({
    user: {},
    progress: [],
    webinar: [],
    results: [],
    recomendations: [],
    journal: [],
    achievements: [],
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
    }
}

export const actions = {
    SET_USER: (context, payload) => {
        context.commit('SET_USER', payload);
    },
    LOAD_PROFILE: (context, payload) => {
        let profile = {
            user: {
                role: 'user',
                points: 35000,
                name: 'Иванов Иван Иванович',
                avatar: '',
            },
            progress: [
                {
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки',
                    lectors: 'Иванов А.А.',
                    type: 'Курс',
                    progress: 50
                },
                {
                    image: 'https://www.iserbia.rs/files//2018/06/tajna-oruzja-uverljivih-ljudi.jpg',
                    title: 'Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки 2',
                    lectors: 'Иванов А.А.',
                    type: 'Курс',
                    progress: 99
                }
            ],
            webinar: [
                {
                    type: 'course',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    date: '20.04.2022 16:00',
                    lectors: 'Саликов И.А.',
                    webinarType: 'Вебинар в рамках курса'
                },
                {
                    type: 'free',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    date: '20.04.2022 16:00',
                    lectors: 'Саликов И.А.',
                    webinarType: 'Вебинар в рамках курса'
                }
            ],
            results: [
                {
                    type: 'one',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    lectors: 'Иванов И.И',
                    date: '20.04.2022'
                },
                {
                    type: 'two',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    lectors: 'Иванов И.И',
                    date: '20.04.2022'
                },
                {
                    type: 'three',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    lectors: 'Иванов И.И',
                    date: '20.04.2022'
                },
                {
                    type: 'four',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    lectors: 'Иванов И.И',
                    date: '20.04.2022'
                },
                {
                    type: 'five',
                    title: 'Обращение взыскания на интеллектуальную собственность: тренды',
                    lectors: 'Иванов И.И',
                    date: '20.04.2022'
                }
            ],
            journal: [
                {
                    type: '',
                    title: 'Задание по курсу: Обращение взыскания на интеллектуальную собственность',
                    text: 'Вычислите квадратный корень...',
                    date: '20.04.2022'
                },
                {
                    type: '',
                    title: 'Задание по курсу: Обращение взыскания на интеллектуальную собственность',
                    text: 'Вычислите квадратный корень...',
                    date: '20.04.2022'
                }
            ],
            achievements: [
                {
                    image: 'https://salikov-law-practice-layout.vercel.app/assets/images/icons/achievements/2.png',
                    title: 'Тяга к знаниям',
                    text: 'Начать первый курс обучения'
                },
                {
                    image: 'https://salikov-law-practice-layout.vercel.app/assets/images/icons/achievements/3.png',
                    title: 'Человек паук',
                    text: 'Прохождение нескольких курсов одновременно'
                }

            ]
        }

        context.commit('SET_USER', profile.user);
        context.commit('SET_PROGRESS', profile.progress);
        context.commit('SET_WEBINAR', profile.webinar);
        context.commit('SET_RESULTS', profile.results);
        context.commit('SET_JOURNAL', profile.journal);
        context.commit('SET_ACHIEVEMENTS', profile.achievements);
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
    }
}