<template lang="pug">
.page-statistic.full-page
    StatisticMenu
    StatisticChart
    
</template>

<script>
export default {
    data() {
        return {
            
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
            //this.LoadStatisticNumbers()
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')

        //this.LoadStatisticNumbers()
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>