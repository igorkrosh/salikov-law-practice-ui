<template lang="pug">
.col-wrapper
    .col.first.page-referral(v-if="Object.keys(this.$store.getters.USER).length !== 0")
        .block
            .score
                b На вашем счету:
                .value 
                    |{{this.$store.getters.USER.points.toLocaleString('ru')}} 
                    small баллов
                button.btn Курсы за баллы 
            .statistic
                b Приглашено партнеров: {{this.$store.getters.USER.invites.toLocaleString('ru')}} 
                b Получено баллов всего: {{this.$store.getters.USER.allPoints.toLocaleString('ru')}}
        .block 
            h3 Рекомендуйте {Название платформы}
            p Получайте баллы за каждого приглашенного участника и учитесь абсолютно бесплатно! 
            p Скопируйте ссылку и предоставьте её будущему участнику. Вы будете получать баллы каждый раз после его покупки курса или вебинара.
            b Реферальная ссылка:
            button.btn.blue 
                |https://lk.sitename.ru/auth/signup?referral=c1462078b5 
                img(src="/assets/images/icons/foreign.png")
        

    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Реферальная программа')
    }
}
</script>

<style lang="scss">

</style>