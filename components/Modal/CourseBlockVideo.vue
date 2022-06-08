<template lang="pug">
Modal(:name="ModalName" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить видео-запись
        .input-wrapper 
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper 
            label Название урока:
            .input
                input(v-model="module.title")
        .input-wrapper 
            label Ссылка на видео-запись:
            .input
                input(placeholder="https://www.youtube.com" v-model="module.link")
        VideoIframe(v-if="module.link" :link="module.link")
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
            return `course-block-video-${this.blockId}`;
        },
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

<style>

</style>