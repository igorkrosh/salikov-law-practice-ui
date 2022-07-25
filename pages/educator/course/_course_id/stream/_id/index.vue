<template lang="pug">
.page-test.full-page.stream-page
    .card(v-if="data")
        kinescope-player.player-wrapper(:video-id="data.kinescope_id")
        StreamChat(moduleType="module" :streamId="moduleId" :courseId="courseId")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            data: null,
            courseId: null,
            moduleId: null,
        };
    },
    methods: {
        LoadModule() {
            this.$axios.$get(`/api/module/stream/${this.moduleId}`)
                .then(response => {
                this.data = response;
            })
                .catch(error => {
                this.$notify({ title: "Ошибка загрузки модуля", text: error.response.data.message, type: "error" });
            });
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