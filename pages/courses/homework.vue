<template lang="pug">
.page-homework.full-page
    .card 
        .desc
            p 
                b 1. Вычислить квадратный корень из комплексного числа 
            p 
                b 2. Дата революции в России
        .input-wrapper 
            label Ответ на задание: 
            TextEditor
        .btn-wrapper 
            button.file Прикрепить файл
        .center 
            button.btn.sm Подтвердить
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Прохождение задания')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.page-homework 
{
    .card
    {
        flex-direction: column;

        .input-wrapper 
        {
            width: 100%;
            margin-top: 20px;
        }

        .btn-wrapper 
        {
            display: flex;
            justify-content: right;
            margin-bottom: 20px;
        }
    }
    .desc 
    {
        
    }
}
</style>