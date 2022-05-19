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
.page-test-result
{
    .result.red 
    {
        color: #b40606;
    }

    .result.green 
    {
        color: #017f01;
    }

    .result 
    {
        width: 100%;
        text-align: center;
        font-size: 14px;
    }

    .question
    {
        width: 100%;
        span.text 
        {
            padding-left: 40px;
            display: block;
            position: relative;
        }

        .test-wrapper 
        {
            margin-top: 20px;
            margin-bottom: 10px;

            .correct 
            {
                color: #017f01;
            }
        }

        span.wrong:after 
        {
            content: '';
            width: 19px;
            height: 19px;
            background: url(/assets/images/icons/close.png);
            position: absolute;
            left: 5px;
            top: 0;
            bottom: 0;
            margin: auto;
        }

        span.correct:after 
        {
            content: '';
            width: 22px;
            height: 16px;
            background: url(/assets/images/icons/done.png);
            position: absolute;
            left: 5px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }

    .input-wrapper
    {
        width: 100%;
        textarea 
        {
            width: 100%;
            resize: none;
            min-height: 200px;
            border-radius: 0;
            border: 1px solid #dedede;
            padding: 10px;
            font-family: 'OpenSans';
        }

        textarea:focus 
        {
            outline: none;
        }
    }

    h3 
    {
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 0 100px;
        margin-bottom: 40px;
    }

    .counter
    {
        display: flex;
        width: 100%;
        justify-content: space-evenly;

        .item 
        {
            display: flex;
            flex-direction: column;
            align-items: center;

            span 
            {
                font-size: 18px;
                font-weight: 700;
            }

            b 
            {
                font-size: 24px;
            }
        }

        .wrong 
        {
            span 
            {
                color: #b40606;
            }
        }

        .correct 
        {
            span 
            {
                color: #017f01;
            }
        }
    }

    h2 
    {
        width: 100%;
        text-align: center;
        margin: 40px 0;
    }
}
</style>