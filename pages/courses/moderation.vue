<template lang="pug">
.courses-wrapper.full-page
    CourseCard(v-for="(item, index) in courses" :key="index" :item="item" :link="`/courses/edit/${item.id}`")
</template>

<script>
export default {
    data() {
        return {
            courses: []
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Модерация')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        
        this.$axios.$get(`/api/course/status/check`)
        .then(response => {
            this.courses = response
        })
        .catch(error => {
            this.$notify({title: 'Ошибка загрузки списка курсов', text: error.response.data.message, type: 'error'})
        })
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>

</style>