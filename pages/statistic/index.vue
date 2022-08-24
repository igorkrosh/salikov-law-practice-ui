<template lang="pug">
.page-statistic.full-page
    StatisticMenu
    StatisticChart
    .stats-wrapper 
        .stat 
            span.big {{numbers.sum}} р 
            span.small Общих доход
        .stat 
            span.big {{numbers.count}} 
            span.small Кол-во заказов
        .stat 
            span.big {{numbers.jurictic}} 
            span.small Кол-во заявок юр.лиц
</template>

<script>
export default {
    data() {
        return {
            numbers: {
                sum: 0,
                count: 0,
                jurictic: 0,
            }
        }
    },
    methods: {
        LoadStatisticNumbers()
        {
            let personal = this.$store.getters.USER.role == 'author'
            this.$axios.$post(`/api/statistic/numbers`, {
                personal: personal
            })
            .then(response => {
                this.numbers = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
            })
        }
    },
    watch: {
        '$store.getters.USER.role': function () {
            this.LoadStatisticNumbers()
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')

        this.LoadStatisticNumbers()
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>