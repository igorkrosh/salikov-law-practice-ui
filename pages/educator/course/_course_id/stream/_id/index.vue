<template lang="pug">
.page-test.full-page.stream-page
    .card(v-if="data")
        kinescope-player.player-wrapper(:video-id="videoId")
        StreamChat(moduleType="module" :streamId="moduleId" :courseId="courseId" :status="data.status")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            data: null,
            courseId: null,
            moduleId: null,
            videoId: null,
        };
    },
    methods: {
        LoadModule() {
            this.$axios.$get(`/api/module/stream/${this.moduleId}`)
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
        this.courseId = this.$route.params.course_id;
        this.moduleId = this.$route.params.id;
        this.LoadModule();
    },
    destroyed() {
        this.$store.dispatch("SET_DISABLE_BG_WHITE", false);
    },
}
</script>

<style lang="scss">

</style>