<template lang="pug">
.root
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
    .stats-wrapper 
        .stat 
            span.big {{numbers.sum}} р 
            span.small Общий доход
        .stat(v-if="$store.getters.USER.role != 'author'")
            span.big {{numbers.royalty}} р 
            span.small Отчисления авторам
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
            columnChartData: [],
            lineChartData: [],
            type: '',
            numbers: {
                sum: 0,
                count: 0,
                jurictic: 0,
            }
        }
    },
    methods: {
        LoadTodayStatistic()
        {
            if (this.$store.getters.USER.role != 'author')
            {
                this.$axios.$get(`/api/statistic/today`)
                .then(response => {
                    this.columnChartData = response.chart;
                    this.numbers = response.numbers;
                    this.type = 'today'
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
            else 
            {
                this.$axios.$post(`/api/statistic/today`, {
                    personal: true
                })
                .then(response => {
                    this.columnChartData = response.chart;
                    this.numbers = response.numbers;
                    this.type = 'today'
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
            
        },
        LoadDaysStatistic(days)
        {
            if (this.$store.getters.USER.role != 'author')
            {
                this.$axios.$get(`/api/statistic/days/${days}`)
                .then(response => {
                    this.lineChartData = response.chart;
                    this.numbers = response.numbers;
                    this.type = `${days}-days`
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
            else 
            {
                this.$axios.$post(`/api/statistic/days/${days}`, {
                    personal: true
                })
                .then(response => {
                    this.lineChartData = response.chart;
                    this.numbers = response.numbers;
                    this.type = `${days}-days`
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
            
        },
        LoadYearStatistic()
        {
            if (this.$store.getters.USER.role != 'author')
            {
                this.$axios.$get(`/api/statistic/year`)
                .then(response => {
                    this.columnChartData = response.chart;
                    this.numbers = response.numbers;
                    this.type = `year`
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
            else 
            {
                this.$axios.$post(`/api/statistic/year`, {
                    personal: true
                })
                .then(response => {
                    this.columnChartData = response.chart;
                    this.numbers = response.numbers;
                    console.log(response)
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
                })
            }
        }
    },
    watch: {
        '$store.getters.USER.role': function () {
            this.LoadTodayStatistic()
        }
    },
    mounted()
    {
        this.LoadTodayStatistic();
    },
}
</script>

<style>

</style>