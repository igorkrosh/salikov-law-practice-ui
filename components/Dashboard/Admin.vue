<template lang="pug">
.col-wrapper
    .col.first
        .progress-wrapper.block
            ProfileAdminCourseItem(v-for="(item, index) in this.$store.getters['admin/COURSES']" :key="index" :item="item")
            NuxtLink(to="/courses/add").btn Добавить свой курс
        .webinar.block(v-if="this.$store.getters.WEBINAR.length > 0")
            h2 Вебинары:
            .webinar-wrapper
                ProfileWebinarItem(v-for="(item, index) in this.$store.getters.WEBINAR" :key="index" :item="item")
    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Курсы')
        this.$store.dispatch('admin/LOAD_COURSES');
    }
}
</script>

<style>

</style>