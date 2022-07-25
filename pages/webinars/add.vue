<template lang="pug">
.col-wrapper
    .col.first
        WebinarEditor(@save-webinar="CreateWebinar")        
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    methods: {
        CreateWebinar(webinar, cover)
        {
            this.$axios.$post(`/api/webinar/create`, webinar)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Вебинар успешно создан', type: 'success'});

                if (cover != null)
                {
                    let formData = new FormData()
                    formData.append('cover', cover)

                    this.$axios.$post(`/api/file/webinar/${response.id}/cover`, formData)
                    .then(response => {})
                    .catch(error => {
                        this.$notify({title: 'Ошибка загрузки обложки курса', text: error.response.data.message, type: 'error'})
                    })
                }

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