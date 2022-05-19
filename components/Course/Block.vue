<template lang="pug">
.card.course-bloks
    b Блок №{{index}}
    .input-wrapper 
        label Название блока
        input
    .date-row 
        .wrapper
            DatePicker(label="Дата проведения")
    .btn-wrapper
        button.btn(@click="ModalShow(`course-block-stream-${index}`)") Стрим-ссылка 
        button.btn(@click="ModalShow(`course-block-video-${index}`)") Видео-запись
        button.btn.blue(@click="ModalShow(`course-block-job-${index}`)") Задания
        button.btn.blue(@click="ModalShow(`course-block-test-${index}`)") Тесты
    ModalCourseBlockStream(:blockId="index" @modal-close="ModalClose")
    ModalCourseBlockVideo(:blockId="index" @modal-close="ModalClose")
    ModalCourseBlockJob(:blockId="index" @modal-close="ModalClose")
    ModalCourseBlockTest(:blockId="index" @modal-close="ModalClose")
</template>

<script>
export default {
    props: ['count'],
    data() {
        return {
            index: 0
        }
    },
    methods: {
        ModalShow(modalName) 
        {
            this.$modal.show(modalName);
        },
        ModalClose(modalName)
        {
            this.$modal.hide(modalName);
        }
    },
    mounted() {
        this.index = this.count;
    }
}
</script>

<style>

</style>