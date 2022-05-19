<template lang="pug">
.page-test.full-page
    .card
        span.counter Вопрос 1 из 8
        h3 Офис-менеджер провожает вас к рабочему месту и предлагает начать работу прямо сейчас. Деваться некуда, вы уже согласились! С чего начнёте?
        .test-wrapper 
            label.radio Почитаю историю сообщений в чатике. Там всегда обсуждают то, что горит!
                input(type="radio" name="test")
                span.checkmark
            label.radio Попытаюсь найти какие-нибудь инструкции и понять, как тут вообще всё работает.
                input(type="radio" name="test")
                span.checkmark
            label.radio Посмотрю сайт проекта, определю его недостатки и и начну немедленно составлять список предложений по его переделке.
                input(type="radio" name="test")
                span.checkmark
            label.radio Поищу отзывы клиентов о компании и разберусь, что нужно исправить в нашем сервисе.
                input(type="radio" name="test")
                span.checkmark
        .center 
            button.btn.blue.sm Назад
            button.btn.sm Далее
</template>

<script>
export default {
    mounted() 
    {
        this.$store.dispatch('SET_PAGETITLE', 'Прохождение теста')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.page-test 
{
    .card
    {
        width: 100%;
    }

    .counter 
    {
        width: 100%;
        text-align: center;
        font-size: 14px;
    }

    h3 
    {
        font-size: 16px;
        width: 100%;
        text-align: center;
        padding: 0 100px;
        margin-bottom: 40px;
    }

    

    .center 
    {
        margin-top: 20px;
        .btn 
        {
            margin: 5px;
        }
    }
}
</style>