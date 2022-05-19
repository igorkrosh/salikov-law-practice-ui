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
        .results-wrapper
                .icon.one
                .icon.two
                .icon.three
                .icon.four
                .icon.five
        .center
            button.btn Подтвердить
            
</template>

<script>
export default {
    
}
</script>

<style lang="scss">

</style>