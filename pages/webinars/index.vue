<template lang="pug">
    .col-wrapper
        .col.first
            .progress-wrapper.block
                ProfileAdminCourseItem(v-for="(item, index) in this.$store.getters.PROGRESS" :key="index" :item="item")
                button(to="/courses/add").btn Добавить свой вебинар
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Вебинары')
    }
}
</script>

<style>

</style>