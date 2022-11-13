<template lang="pug">
.page-statistic.page-referral.full-page
    StatisticMenu
    .filter-radio.big
        label.radio Реферальная ссылка
            input(type="radio" value="ref" v-model="type")
            span.checkmark
        label.radio Реклама
            input(type="radio" value="ad" v-model="type")
            span.checkmark
        label.radio Соц. сети
            input(type="radio" value="soc" v-model="type")
            span.checkmark
    .add-wrapper
        button.btn.sm(@click="$modal.show('referral-create')") Добавить источник +
    .table-wrapper
        table.promo-table.sm
            thead
                tr
                    th Ссылка
                    th Кол-во переходов
                    th Кол-во заявок
                    th Общий доход
                    th Коментарий
                    th 
            tbody
                tr(v-for="ref in referrals") 
                    td
                        //button.link(@click="CopyLink(ref.link)") {{ref.link}}
                        a(:href="ref.link" target="_blank").link {{ref.link}}
                    td {{ref.count}}
                    td {{ref.requests}}
                    td {{ref.sum}} р.
                    td {{ref.comment}}
                    td
                        button.btn.red.sm.btn-delete(@click="DeleteReferralLink(ref.ref_id)") Удалить
    ModalCreateReferral(@create-referral="LoadReferral")
</template>

<script>
export default {
    data() {
        return {
            referrals: [],
            type: 'ref',
        }
    },
    methods: {
        LoadReferral()
        {
            if (this.$store.getters.USER.role != 'author')
            {
                this.$axios.$get(`/api/referral/${this.type}/get`)
                .then(response => {
                    this.referrals = response;
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки списка источников', text: error.response.data.message, type: 'error'})
                })
            }
            else 
            {
                this.$axios.$get(`/api/referral/${this.type}/get`, {
                    personal: true
                })
                .then(response => {
                    this.referrals = response;
                })
                .catch(error => {
                    this.$notify({title: 'Ошибка загрузки списка источников', text: error.response.data.message, type: 'error'})
                })
            }
        },
        CopyLink(link)
        {
            try 
            {
                navigator.clipboard.writeText(link);
                this.$notify({title: 'Ссылка скопирована', type: 'info'})
            } 
            catch(error) 
            {
                console.log(error)
                this.$notify({title: 'Ошибка копирования', type: 'error'})
            }
        },
        DeleteReferralLink(refId)
        {
            this.$axios.$delete(`/api/referral/delete/${refId}`)
            .then(response => {
                this.$notify({title: 'Источник удален', type: 'success'})
                this.LoadReferral();
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления источника', text: error.response.data.message, type: 'error'})
            })
        }
    },
    watch: {
        type()
        {
            this.LoadReferral();
        },
        '$store.getters.USER': function () {
            this.LoadReferral();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Статистика продаж')

        this.LoadReferral();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>