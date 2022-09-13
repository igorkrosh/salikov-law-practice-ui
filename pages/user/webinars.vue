<template lang="pug">
.courses-wrapper.full-page
    CourseCard(v-for="(item, index) in webinars" :key="index" :item="item" :link="`/webinars/stream/${item.id}`" v-if="item.type != 'stream'")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            webinars: []
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Вебинары');
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.$axios.$get('/api/webinar/current')
        .then(response => {
            this.webinars = response;
        })
        .catch(error => {
            this.$notify({title: 'Ошибка загрузки вебинаров', text: error.response.data.message, type: 'error'})
        })
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>