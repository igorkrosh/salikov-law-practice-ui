<template lang="pug">
.col-wrapper
    .col.first.page-referral(v-if="referralData != null")
        .block
            .score
                b На вашем счету:
                .value 
                    |{{referralData.points.toLocaleString('ru')}} 
                    small баллов
            .statistic
                b Приглашено партнеров: {{referralData.count.toLocaleString('ru')}} 
                b Получено баллов всего: {{referralData.all_points.toLocaleString('ru')}}
        .block 
            h3 Рекомендуйте {Название платформы}
            p Получайте баллы за каждого приглашенного участника и учитесь абсолютно бесплатно! 
            p Скопируйте ссылку и предоставьте её будущему участнику. Вы будете получать баллы каждый раз после его покупки курса или вебинара.
            b Реферальная ссылка:
            button(target="_blank" @click="CopyLink").btn.blue 
                |{{referralData.invite_link}}
                img(src="/assets/images/icons/foreign.png")
        

    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            referralData: null
        }
    },
    methods: {
        LoadReferralData()
        {
            this.$axios.$get(`/api/user/referral`)
            .then(response => {
                this.referralData = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки данных', text: error.response.data.message, type: 'error'})
            })
        },
        CopyLink()
        {
            navigator.clipboard.writeText(this.referralData.invite_link).then(text => {
                this.$notify({title:'Ссылка скопирована', text: ''})
            });
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Реферальная программа')

        this.LoadReferralData();
    }
}
</script>

<style lang="scss">

</style>