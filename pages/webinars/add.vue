<template lang="pug">
.col-wrapper
    .col.first
        WebinarEditor(@save-webinar="CreateWebinar")        
    ProfileColumnInfo
</template>

<script>
export default {
    methods: {
        CreateWebinar(webinar)
        {
            this.$axios.$post(`/api/webinar/create`, webinar)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Вебинар успешно создан', type: 'success'});
                this.$router.push('/dashboard')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка', text: 'Ошибка создания вебинара', type: 'error'});
            })
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Добавить вебинар')
    }
}
</script>

<style>

</style>