<template lang="pug">
.page-test.full-page.stream-page
    .root(v-if="access")
        .card(v-if="data")
            kinescope-player.player-wrapper(:video-id="videoId")
            StreamChat(moduleType="webinar" :streamId="webinarId")
            CourseFileList(v-if="data.files" :files="data.files")
            CourseFilesPreview(v-if="data.preview" :files="data.preview")
        ReviewEditor(type="webinar" :id="webinarId")
    .root(v-else)
        .card 
            h3 У вас нет доступа к этому вебинару
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            data: null,
            webinarId: null,
            videoId: '',
            access: null
        };
    },
    methods: {
        LoadWebinar() {
            this.$axios.$get(`/api/check/webinar/${this.webinarId}/access`)
            .then(response => {
                this.access = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки доступа', text: error.response.data.message, type: 'error'})
            })
            this.$axios.$get(`/api/webinar/${this.webinarId}/get`)
            .then(response => {
                this.data = response;
                this.ParseLink();
            })
            .catch(error => {
                this.$notify({ title: "Ошибка загрузки модуля", text: error.response.data.message, type: "error" });
            });
        },
        ParseLink()
        {
            let urlParse = this.data.link.split('/');
            this.videoId = urlParse[urlParse.length - 1]
        }
    },
    mounted() {
        this.$store.dispatch("SET_PAGETITLE", "Стрим");
        this.$store.dispatch("SET_DISABLE_BG_WHITE", true);
        this.webinarId = this.$route.params.id;
        this.LoadWebinar();
    },
    destroyed() {
        this.$store.dispatch("SET_DISABLE_BG_WHITE", false);
    },
}
</script>

<style lang="scss">

</style>