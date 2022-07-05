<template lang="pug">
.page-homework.full-page
    .card(v-if="data")
        h3 {{data.title}}
        .desc(v-html="data.text")
        .input-wrapper 
            label Ответ на задание: 
            TextEditor(v-model="text")
        .btn-wrapper 
            button.file Прикрепить файл
        .center 
            button.btn.sm(@click="SendJob") Подтвердить
</template>

<script>
export default {
    data() {
        return {
            courseId: 0,
            moduleId: 0,
            data: null,
            text: '',
        }
        
    },
    methods: {
        LoadModule()
        {
            this.$axios.$get(`/api/module/job/${this.moduleId}/`)
            .then(response => {
                this.data = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки модуля', text: error.response.data.message, type: 'error'})
            })
        },
        SendJob()
        {
            this.$axios.$post(`/api/module/job/${this.moduleId}/task`, {
                task: this.text
            })
            .then(response => {
                this.$notify({title: 'Задание отправлено на проверку', type: 'success'})
                this.$router.push(`/user/course/${this.courseId}`);
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки задания', text: error.response.data.message, type: 'error'})
            })
        }

    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Прохождение задания')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.courseId = this.$route.params.id;
        this.moduleId = this.$route.params.moduleId;

        this.LoadModule()
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
}
</style>