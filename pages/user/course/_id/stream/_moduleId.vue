<template lang="pug">
.page-test.full-page.stream-page
    .card(v-if="data")
        kinescope-player.player-wrapper(:video-id="201255626")
        StreamChat(moduleType="module" :streamId="moduleId")
        CourseFileList(v-if="data.files" :files="data.files")
        CourseFilesPreview(v-if="data.preview" :files="data.preview")
    ReviewEditor(type="stream" :id="moduleId")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            data: null,
            courseId: null,
            moduleId: null,
        }
    },
    methods: {
        LoadModule()
        {
            this.$axios.$get(`/api/module/stream/${this.moduleId}`)
            .then(response => {
                this.data = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки модуля', text: error.response.data.message, type: 'error'})
            })
        },
        SetStatus()
        {
            this.$axios.$post(`/api/module/stream/${this.moduleId}/status`, {
                user_id: this.$store.getters.USER.id,
                status: 'done'
            })
            .then(response => {})
            .catch(error => {
                this.$notify({title: 'Ошибка отправки статуса модуля', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted() 
    {
        this.$store.dispatch('SET_PAGETITLE', 'Стрим')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.courseId = this.$route.params.id;
        this.moduleId = this.$route.params.moduleId;

        this.LoadModule();
        this.SetStatus();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>