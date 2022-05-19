<template lang="pug">
Modal(name="homework-modal" height="auto" width="800" classes="dialog" :adaptive="true" :scrollable="true")
    .card.homework-block
        .btn-modal-close(@click="$emit('modal-close', 'homework-modal')")
        h3 Проверка задания 
        h4 Ученик <b>Иванов И.И.</b>
        .desc 
            b 1. Вычислить квадратный корень
            b 2. Дата революции в России
        .block-wrapper 
            label Ответ
            .answer 
        .block-wrapper 
            label Коментарий преподователя
            TextEditor
            
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.card.homework-block
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 
    {
        font-size: 18px;
        width: 100%;
        text-align: center;
        margin-bottom: 0;
    }

    h4 
    {
        font-size: 14px;
        width: 100%;
        text-align: center;
        margin-top: 5px;

        b 
        {
            color: #80a6b4;
        }
    }

    .desc 
    {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        b 
        {
            margin-bottom: 5px;
        }
    }
    .answer
    {
        padding: 20px;
        border: 1px solid #ededed;
        width: 100%;
        min-height: 150px;
    }

    .block-wrapper 
    {
        width: 100%;
        margin-top: 10px;

        label 
        {
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
        }
    }
}
</style>