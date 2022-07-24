<template lang="pug">
.courses-wrapper.full-page
    CourseCard(v-for="(item, index) in this.$store.getters.ALL_USER_COURSES" :key="index" :item="item" :link="`/user/course/${item.id}`")
</template>

<script>
export default {
    data() {
        return {
            courses: []
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Курсы')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        
        this.$axios.$get(`/api/course/all`)
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

<style lang="scss">

</style>