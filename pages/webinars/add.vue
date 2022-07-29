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
            let formData = new FormData()
            formData.append("webinar", JSON.stringify(webinar));

            for (let file of webinar.new_files)
            {
                formData.append(file.id, file.file)
            }

            this.$axios.$post(`/api/webinar/create`, formData)
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