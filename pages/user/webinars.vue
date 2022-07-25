<template lang="pug">
.courses-wrapper.full-page
    CourseCard(v-for="(item, index) in this.$store.getters.WEBINAR" :key="index" :item="item" :link="`/webinars/stream/${item.id}`" v-if="item.type != 'stream'")
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
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>