<template lang="pug">
.page-test.full-page
    .card.pad-min(v-if="data")
        kinescope-player.player-wrapper(:video-id="data.kinescope_id" @time-update="HandlerProgress")
        CourseFileList(v-if="data.files" :files="data.files")
        CourseFilesPreview(v-if="data.preview" :files="data.preview")
    ReviewEditor(type="video" :id="moduleId")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            data: null,
            courseId: null,
            moduleId: null,
            setStatus: false
        }
    },
    methods: {
        LoadModule()
        {
            this.$axios.$get(`/api/module/video/${this.moduleId}`)
            .then(response => {
                this.data = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки модуля', text: error.response.data.message, type: 'error'})
            })
        },
        HandlerProgress(data)
        {
            if (data.percent < 80 || this.setStatus)
            {
                return
            }

            this.$axios.$post(`/api/module/video/${this.moduleId}/status`, {
                user_id: this.$store.getters.USER.id,
                status: 'done'
            })
            .then(response => {})
            .catch(error => {
                this.$notify({title: 'Ошибка отправки статуса модуля', text: error.response.data.message, type: 'error'})
            })

            this.setStatus = true;
        }
    },
    mounted() 
    {
        this.$store.dispatch('SET_PAGETITLE', 'Видео')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.courseId = this.$route.params.id;
        this.moduleId = this.$route.params.moduleId;

        this.LoadModule();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>
.card.pad-min
{
    padding: 15px;
}
</style>