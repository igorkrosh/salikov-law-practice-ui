<template lang="pug">
    DashboardUser(v-if="this.$store.getters.USER.role == 'user'")
    DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'admin'")
    DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'educator'")
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style>

</style>