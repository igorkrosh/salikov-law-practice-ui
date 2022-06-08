<template lang="pug">
Modal(:name="ModalName" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить стрим-ссылку
        .input-wrapper 
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper 
            label Название урока:
            .input
                input(v-model="module.title")
        .input-wrapper 
            label Стрим-ссылка:
            .input
                input(placeholder="https://www.ya.ru" v-model="module.link")
        VideoIframe(v-if="module.link" :link="module.link")
        .date-row 
            .wrapper
                DatePicker(label="Дата проведения" v-model="module.date")
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
            return `course-block-stream-${this.blockId}`;
        }
    },
    methods: {
        SaveModule()
        {
            this.$emit('input', this.module);
            this.$emit('modal-close', this.ModalName);
        }
    },
    watch: {
        value() 
        {
            this.module = Object.assign({}, this.value);
        }
    }
}
</script>

<style>

</style>