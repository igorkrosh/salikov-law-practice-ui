<template lang="pug">
.page-statistic.full-page.page-students
    StatisticMenu
    .table-data.min
        table
            thead
                tr
                    th Пользователь
                    //th Email
                    th Тип
                    th Название
                    th Статус
                    th Цена
                    //th Пакет
                    th 
                        .sort
                            span Дата
                            button(:class="{asc: filter.sortDir == 'asc', desc: filter.sortDir == 'desc'}" @click="SetSort()")
                                img(src='/assets/images/icons/sort.png')
            tbody
                tr(v-for="row in table")
                    td 
                        NuxtLink(:to="`/profile/${row.user.id}`").user
                            img(v-if="row.user.avatar" :src="row.user.avatar", alt="").avatar
                            img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                            span {{row.user.name}}
                    //td {{row.user.email}}
                    td {{row.type}}
                    td {{row.name}}
                    td {{row.status}}
                    td {{row.price}}
                    //td {{row.packet}}
                    td {{row.date}}
                
</template>
    
<script>

export default {
    data() {
        return {
            table: [],
            filter: {
                sortBy: 'date',
                sortDir: '',
            }
        }
    },
    methods: {
        LoadOrders()
        {
            this.$axios.$post(`api/order/statistic`, {
                filter: this.filter
            })
            .then(resopnse => {
                this.table = resopnse
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статистики', text: error.response.data.message, type: 'error'})
            })
        },
        SetSort()
        {
            switch (this.filter.sortDir) 
            {
                case '':
                    this.filter.sortDir = 'asc'
                    break;
                case 'asc':
                    this.filter.sortDir = 'desc'
                    break;
                case 'desc':
                    this.filter.sortDir = 'asc'
                    break;
                default:
                    break;
            }
            
            this.LoadOrders();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Заказы')

        this.LoadOrders()
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>