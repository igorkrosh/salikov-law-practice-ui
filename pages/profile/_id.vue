<template lang="pug">
.col-wrapper.page-edit
    .col.first
        ProfileUser(:profile="profile" v-if="profile")
    ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
            profile: null,
            userId: null,
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Профиль')

        this.userId = this.$route.params.id;

        this.$axios.$get(`/api/user/${this.userId}/profile`)
        .then(response => {
            this.profile = response
        })
        .catch(error => {
            this.$notify({title: 'Ошибка загрузки профиля', text: error.response.data.message, type: 'error'})
        })
    },
}
</script>

<style>

</style>