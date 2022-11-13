<template lang="pug">

DashboardUser(v-if="this.$store.getters.USER.role == 'user'")
DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'admin'")
DashboardEducator(v-else-if="this.$store.getters.USER.role == 'educator'")
DashboardAdmin(v-else-if="this.$store.getters.USER.role == 'author'")
DashboardModerator(v-else-if="this.$store.getters.USER.role == 'moderator'")

</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            
        }
    },
    watch: {
        '$store.getters.USER': function () {
            if (this.$store.getters.USER.role == 'moderator')
            {
                //this.$router.push('/courses/moderation')
            }
        }
    }
}
</script>

<style>

</style>