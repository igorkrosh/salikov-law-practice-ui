<template lang="pug">
.page-statistic.page-promocodes.full-page
    StatisticMenu
    .add-wrapper
        button.btn.sm(@click="$modal.show('promocode-create')") Добавить промокод +
    table.promo-table
        thead
            tr
                th Промокод
                th Размер скидки 
                th Кол-во использований
                th Общая сумма скидки
                th Дата начала 
                th Дата окончания
                th 
        tbody
            tr(v-for="promocode in promocodes") 
                td {{promocode.code}}
                td {{promocode.value}} р.
                td {{promocode.count}}
                td {{promocode.sum}} р.
                td {{promocode.date_start}}
                td {{promocode.deadline}}
                td
                    button.btn.red.sm.btn-delete(@click="DeletePromocode(promocode.id)") Удалить
    ModalCreatePromocode(@create-promocode="HandleCreatePromocode")
</template>

<script>
export default {
    data() {
        return {
            promocodes: []
        }
    },
    methods: {
        HandleCreatePromocode(promocode)
        {
            this.$axios.$post(`/api/promocode/add`, promocode)
            .then(response => {
                this.$notify({title: 'Промокод успешно создан', text: '', type: 'success'})
                this.LoadPromocodes();
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания промокода', text: error.response.data.message, type: 'error'})
            })
        },
        LoadPromocodes()
        {
            this.$axios.$get(`/api/promocode/all`)
            .then(response => {
                this.promocodes = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки промокодов', text: error.response.data.message, type: 'error'})
            })
        },
        DeletePromocode(id)
        {
            this.$axios.$delete(`/api/promocode/delete/${id}`)
            .then(response => {
                this.LoadPromocodes();
                this.$notify({title: 'Промокод успешно удален', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления промокода', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')

        this.LoadPromocodes();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>