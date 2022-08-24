<template lang="pug">
.page-statistic.page-courses.full-page
    StatisticMenu
    table.promo-table.sm
        thead
            tr
                th Курс
                th Кол-во переходов
                th Купили курс
                th Общий доход
                th 
        tbody
            tr(v-for="course in courses") 
                td {{course.name}}
                td {{course.count}}
                td {{course.orders}}
                td {{course.sum}} р.
</template>

<script>
export default {
    data() {
        return {
            courses: []
        }
    },
    methods: {
        LoadCourses()
        {
            if (this.$store.getters.USER.role != 'author')
            {
                this.$axios.$get(`/api/statistic/courses`)
                .then(response => {
                    this.courses = response;
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки курсов', text: error.response.data.message, type: 'error'})
                })
            }
            else 
            {
                this.$axios.$post(`/api/statistic/courses`, {
                    personal: true
                })
                .then(response => {
                    this.courses = response;
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки курсов', text: error.response.data.message, type: 'error'})
                })
            }
        }
    },
    watch: {
        '$store.getters.USER': function () {
            this.LoadCourses();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')

        this.LoadCourses();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>