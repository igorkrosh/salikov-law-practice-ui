<template lang="pug">
.courses-wrapper.full-page
    CourseCard(v-for="(item, index) in this.webinars" :key="index" :item="item")
</template>

<script>
export default {
    data() {
        return {
            webinars: []
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Вебинары');
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.$axios.$get(`/api/webinar/all`)
        .then(response => {
            this.webinars = response
        })
        .catch(error => {
            this.$notify({title: 'Ошибка загрузки списка вебинаров', text: error.response.data.message, type: 'error'})
        })
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>