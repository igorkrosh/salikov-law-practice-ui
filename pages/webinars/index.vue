<template lang="pug">
.col-wrapper
    .col.first
        .progress-wrapper.block
            ProfileAdminWebinarItem(v-for="(item, index) in this.$store.getters['admin/WEBINARS']" :key="index" :item="item")
            NuxtLink(to="/webinars/add").btn Добавить свой вебинар
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Вебинары')
        this.$store.dispatch('admin/LOAD_WEBINARS')
    }
}
</script>

<style>

</style>