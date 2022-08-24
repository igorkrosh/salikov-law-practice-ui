<template lang="pug">

DashboardUser(v-if="this.$store.getters.USER.role == 'user'")
DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'admin'")
DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'educator'")
DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'author'")

</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>