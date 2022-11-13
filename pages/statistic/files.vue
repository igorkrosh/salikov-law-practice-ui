<template lang="pug">
.page-statistic.full-page.page-students
    StatisticMenu
    .table-data
        table
            thead
                tr
                    th Имя файла
                    th Ссылка
                    th Дата загрузки
                    th Курс
                    th 
                        .sort
                            span Кол-во скачиваний
                            button(:class="{asc: filter.sortDir == 'asc', desc: filter.sortDir == 'desc'}" @click="SetSort()")
                                img(src='/assets/images/icons/sort.png')
            tbody
                tr(v-for="row in table")
                    td.filename {{row.filename}}
                    td
                        a.link(:href="row.link" target="_blank") Скачать
                    td {{row.date}}
                    td {{row.course}}
                    td {{row.download}}
                
</template>
    
<script>

export default {
    data() {
        return {
            table: [],
            filter: {
                sortBy: 'download',
                sortDir: '',
            }
        }
    },
    methods: {
        LoadFiles()
        {
            this.$axios.$post(`api/file/statistic`, {
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
            
            this.LoadFiles();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Файлы')

        this.LoadFiles()
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.table-data
{
    .filename 
    {
        word-break: break-all;
    }
}
</style>