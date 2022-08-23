<template lang="pug">
.page-statistic.full-page
    StatisticMenu
    StatisticChart
    .stats-wrapper 
        .stat 
            span.big 324 000 р 
            span.small Общих доход
        .stat 
            span.big 540 
            span.small Кол-во заказов
        .stat 
            span.big 45
            span.small Кол-во заявок юр.лиц
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>