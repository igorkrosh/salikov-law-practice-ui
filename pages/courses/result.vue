<template lang="pug">
.page-test-result.full-page
    .card 
        .result.red Очень жаль, но тест не пройден.
        h3 Попробуйте вернуться к изучению предыдущих уроков и затем пересдайте тест. Если возникли трудности — не стесняйтесь обратиться к кураторам курса, они будут рады помочь.
        .counter 
            .correct.item
                span Правильных
                b 3 \ 8
            .wrong.item
                span Неправильных
                b 5 \ 8
        h2 Ваши ответы 
        .question
            span.text.wrong Офис-менеджер провожает вас к рабочему месту и предлагает начать работу прямо сейчас. Деваться некуда, вы уже согласились! С чего начнёте?
            .test-wrapper 
                label.radio Почитаю историю сообщений в чатике. Там всегда обсуждают то, что горит!
                    input(type="radio" name="test" disabled checked)
                    span.checkmark
                label.radio.correct Попытаюсь найти какие-нибудь инструкции и понять, как тут вообще всё работает.
                    input(type="radio" name="test" disabled)
                    span.checkmark
                label.radio Посмотрю сайт проекта, определю его недостатки и и начну немедленно составлять список предложений по его переделке.
                    input(type="radio" name="test" disabled)
                    span.checkmark
                label.radio.correct Поищу отзывы клиентов о компании и разберусь, что нужно исправить в нашем сервисе.
                    input(type="radio" name="test" disabled)
                    span.checkmark
            .input-wrapper
                label Коментарий преподавателя 
                textarea(disabled)
        .question
            span.text.correct Офис-менеджер провожает вас к рабочему месту и предлагает начать работу прямо сейчас. Деваться некуда, вы уже согласились! С чего начнёте?
            .test-wrapper 
                label.radio.correct Почитаю историю сообщений в чатике. Там всегда обсуждают то, что горит!
                    input(type="radio" name="test1" disabled checked)
                    span.checkmark
                label.radio Попытаюсь найти какие-нибудь инструкции и понять, как тут вообще всё работает.
                    input(type="radio" name="test1" disabled )
                    span.checkmark
                label.radio Посмотрю сайт проекта, определю его недостатки и и начну немедленно составлять список предложений по его переделке.
                    input(type="radio" name="test1" disabled )
                    span.checkmark
                label.radio Поищу отзывы клиентов о компании и разберусь, что нужно исправить в нашем сервисе.
                    input(type="radio" name="test1" disabled )
                    span.checkmark
            .input-wrapper
                label Коментарий преподавателя 
                textarea(disabled)
            
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Название теста')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>