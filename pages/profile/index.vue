<template lang="pug">
.col-wrapper.page-edit
    .col.first
        ProfileUser(:profile="this.$store.getters.USER")
    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Профиль')
    },
}
</script>

<style>

</style>