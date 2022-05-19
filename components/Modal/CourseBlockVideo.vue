<template lang="pug">
Modal(:name="ModalName" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить видео-запись
        .input-wrapper 
            label Ссылка на видео-запись:
            .input
                input(placeholder="https://www.youtube.com")
        .center 
            button.btn(@click="$emit('modal-close', ModalName)") Подтвердить

</template>

<script>
export default {
    props: ['blockId'],
    computed: {
        ModalName() {
            return `course-block-video-${this.blockId}`;
        }
    }
}
</script>

<style>

</style>