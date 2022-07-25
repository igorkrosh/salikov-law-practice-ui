<template lang="pug">
.col-wrapper.page-edit
    .col.first
        CallbackUserDashboard(v-if="this.$store.getters.USER.role == 'user'")
        CallbackModeratorDashboard(v-if="this.$store.getters.USER.role != 'user'")
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Обратная связь');
    }
}
</script>

<style lang="scss">

</style>