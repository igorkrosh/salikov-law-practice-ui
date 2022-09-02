<template lang="pug">
.col-wrapper.page-edit
    .col.first
        CallbackUserDashboard(v-if="this.$store.getters.USER.role == 'user' || this.$store.getters.USER.role == 'educator' || this.$store.getters.USER.role == 'author'")
        CallbackModeratorDashboard(v-if="this.$store.getters.USER.role == 'moderator' || this.$store.getters.USER.role == 'admin'")
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