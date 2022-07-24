<template lang="pug">
.page-test.full-page.stream-page
    .card(v-if="data")
        kinescope-player.player-wrapper(:video-id="videoId")
        StreamChat(moduleType="webinar" :streamId="webinarId")
</template>

<script>
export default {
    data() {
        return {
            data: null,
            webinarId: null,
            videoId: '',
        };
    },
    methods: {
        LoadWebinar() {
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