<template lang="pug">
    .dashboard
        DashboardUser(v-if="this.$store.getters.USER.role == 'user'")
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