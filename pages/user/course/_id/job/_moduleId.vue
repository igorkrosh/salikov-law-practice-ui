<template lang="pug">
.page-homework.full-page
    .card(v-if="data")
        h3 {{data.title}}
        .desc(v-html="data.text")
        .input-wrapper 
            label Ответ на задание: 
            TextEditor(v-model="text")
        CourseFileList(v-if="data.files" :files="data.files")
        CourseFilesPreview(v-if="data.preview" :files="data.preview")
        .btn-wrapper 
            InputFile(v-model="file" name="job-file")
        .center 
            button.btn.sm(@click="SendJob") Подтвердить
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            courseId: 0,
            moduleId: 0,
            data: null,
            text: '',
            file: null,
        }
        
    },
    methods: {
        LoadModule()
        {
            this.$axios.$get(`/api/module/job/${this.moduleId}`)
            .then(response => {
                this.data = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки модуля', text: error.response.data.message, type: 'error'})
            })
        },
        SendJob()
        {
            let formData = new FormData()
            formData.append("text", this.text);
            formData.append("file", this.file);

            this.$axios.$post(`/api/module/job/${this.moduleId}/task`, formData)
            .then(response => {
                this.$notify({title: 'Задание отправлено на проверку', type: 'success'})

                this.SetStatus();
                this.$store.dispatch("LOAD_PROFILE");

                this.$router.push(`/user/course/${this.courseId}`);
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки задания', text: error.response.data.message, type: 'error'})
            })
        },
        SetStatus()
        {
            this.$axios.$post(`/api/module/job/${this.moduleId}/status`, {
                user_id: this.$store.getters.USER.id,
                status: 'done'
            })
            .then(response => {})
            .catch(error => {
                this.$notify({title: 'Ошибка отправки статуса модуля', text: error.response.data.message, type: 'error'})
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
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }
    }
}
</style>