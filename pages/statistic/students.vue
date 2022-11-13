<template lang="pug">
.page-statistic.full-page.page-students
    StatisticMenu
    .filter-wrapper
        .select-wrapper 
            label Курс:
            select(v-model="filter.course" @change="LoadStudents")
                option(value="") Поиск по курсу
                option(v-for="course in courses" :value="course.id") {{course.name}}
        .filter-row
            .select-wrapper 
                label Сортировать по:
                select(v-model="filter.sortBy" @change="LoadStudents")
                    option(value="") -
                    option(value="date_complete") Прохождение курса
                    option(value="date_payment") Дата оплаты
                    option(value="last_visit") Посещение
            .select-wrapper 
                label Порядок сортировки:
                select(v-model="filter.sortDir" @change="LoadStudents")
                    option(value="asc") По возрастанию
                    option(value="desc") По убыванию
    .table-data.min
        table
            thead
                tr
                    th Пользователь
                    th Email
                    th Регистрация
                    th Прохождение курса
                    th Дата оплаты
                    th Посещение
                    //th Оплата
                    th Статус
            tbody
                tr(v-for="row in table") 
                    td
                        NuxtLink(:to="`/profile/${row.user.id}`").user
                            img(v-if="row.user.avatar" :src="row.user.avatar", alt="").avatar
                            img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                            span {{row.user.name}}
                    td {{row.user.email}}
                    td {{row.created_at}}
                    td {{row.statistic.date_complete}}
                    td {{row.statistic.date_payment}}
                    td {{row.statistic.last_visit}}
                    //td 
                    td(:class="{green: row.status == 'done', red: row.status == 'work'}")
                        span(v-if="row.status == 'done'") Прошел
                        span(v-if="row.status == 'work'") Не прошел
                        
        
</template>
    
<script>

export default {
    data() {
        return {
            table: [
                
            ],
            categories: null,
            courses: null,
            filter: {
                course: '',
                sortBy: '',
                sortDir: 'asc',
            }
        }
    },
    methods: {
        LoadCourseFilter()
        {
            this.$axios.$get(`/api/course/filter`)
            .then(response => {
                this.categories = response.categories
                this.courses = response.courses
                this.LoadStudents()
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки категорий', text: error.response.data.message, type: 'error'})
            })
        },
        LoadStudents()
        {
            this.$axios.$post('/api/course/students', {
                filter: this.filter
            })
            .then(response => {
                this.table = response.users;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки пользователей', text: error.response.data.message, type: 'error'})
            })
        },
        SetSort()
        {
            switch (this.filter.sort) 
            {
                case '':
                    this.filter.sort = 'asc'
                    break;
                case 'asc':
                    this.filter.sort = 'desc'
                    break;
                case 'desc':
                    this.filter.sort = 'asc'
                    break;
                default:
                    break;
            }
            
            this.LoadStudents();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статус обучения')

        this.LoadCourseFilter()
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>