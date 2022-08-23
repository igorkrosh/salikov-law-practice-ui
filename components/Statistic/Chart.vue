<template lang="pug">
.chart-statictic
    .graph-btns 
            button.btn-graph(:class="{'active': type == 'today'}" @click="LoadTodayStatistic") за сегодня
            button.btn-graph(:class="{'active': type == '7-days'}" @click="LoadDaysStatistic(7)") за 7 дней
            button.btn-graph(:class="{'active': type == '30-days'}" @click="LoadDaysStatistic(30)") за 30 дней
            button.btn-graph(:class="{'active': type == '90-days'}" @click="LoadDaysStatistic(90)") за 90 дней
            button.btn-graph(:class="{'active': type == 'year'}" @click="LoadYearStatistic") за год
    .chart-wrapper(v-if="type == 'today' || type == 'year'")
        <column-chart :data="columnChartData"></column-chart>
    .chart-wrapper(v-if="type == '7-days' || type == '30-days' || type == '90-days'")
        <line-chart :data="lineChartData"></line-chart>
</template>

<script>
export default {
    data() {
        return {
            columnChartData: [],
            lineChartData: [],
            type: '',
        }
    },
    methods: {
        LoadTodayStatistic()
        {
            this.$axios.$get(`/api/statistic/today`)
            .then(response => {
                this.columnChartData = response;
                this.type = 'today'
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
            })
        },
        LoadDaysStatistic(days)
        {
            this.$axios.$get(`/api/statistic/days/${days}`)
            .then(response => {
                this.lineChartData = response;
                this.type = `${days}-days`
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
            })
        },
        LoadYearStatistic()
        {
            this.$axios.$get(`/api/statistic/year`)
            .then(response => {
                this.columnChartData = response;
                this.type = `year`
                console.log(response)
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted()
    {
        this.LoadTodayStatistic()
    },
}
</script>

<style>

</style>