<template lang="pug">
Modal(:name="ModalName" height="auto" width="800" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить задание
        .input-wrapper 
            label Задание: 
            TextEditor
        .date-row
            .wrapper
                DatePicker(label="Срок выполнения")
                DatePicker(label="Срок проверки")
            button.file 
                |Прикрепить файл 
        .center 
            button.btn(@click="$emit('modal-close', ModalName)") Подтвердить
                

</template>

<script>
export default {
    props: ['blockId'],
    computed: {
        ModalName() {
            return `course-block-job-${this.blockId}`;
        }
    }
}
</script>

<style lang="scss">

</style>