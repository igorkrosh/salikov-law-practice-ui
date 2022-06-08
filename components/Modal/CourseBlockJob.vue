<template lang="pug">
Modal(:name="ModalName" height="auto" width="800" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить задание
        .input-wrapper 
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper 
            label Название урока:
            .input
                input(v-model="module.title")
        .input-wrapper 
            label Задание: 
            TextEditor(v-model="module.text")
        .date-row
            .wrapper
                DatePicker(label="Срок выполнения" v-model="module.deadline")
                DatePicker(label="Срок проверки" v-model="module.check_date")
            button.file 
                |Прикрепить файл 
        .center 
            button.btn(@click="SaveModule") Подтвердить
                

</template>

<script>
export default {
    props: ['blockId', 'value'],
    data() {
        return {
            module: this.value
        }
    },
    computed: {
        ModalName() {
            return `course-block-job-${this.blockId}`;
        }
    },
    methods: {
        SaveModule()
        {
            this.$emit('input', this.module);
            this.$emit('modal-close', this.ModalName);
        },
    },
    watch: {
        value() 
        {
            this.module = Object.assign({}, this.value);
        }
    }
}
</script>

<style lang="scss">

</style>