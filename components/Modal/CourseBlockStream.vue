<template lang="pug">
Modal(:name="ModalName" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить стрим-ссылку
        .input-wrapper 
            label Название урока:
            .input
                input
        .input-wrapper 
            label Стрим-ссылка:
            .input
                input(placeholder="https://www.ya.ru")
        .date-row 
            .wrapper
                DatePicker(label="Дата проведения")
        .center 
            button.btn(@click="$emit('modal-close', ModalName)") Подтвердить

</template>

<script>
export default {
    props: ['blockId'],
    computed: {
        ModalName() {
            return `course-block-stream-${this.blockId}`;
        }
    }
}
</script>

<style>

</style>