<template lang="pug">
.col-wrapper
    .col.first
        WebinarEditor(@save-webinar="EditWebinar" :enterData="webinar")        
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            webinar: {},
            webinarId: 0,
            disable: false,
        }
    },
    methods: {
        EditWebinar(webinar, cover)
        {
            this.disable = true;
            this.$axios.$post(`/api/webinar/${this.webinarId}/edit`, webinar)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Вебинар сохранен', type: 'success'})

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

                this.$router.push('/webinars');
            })
            .catch(error => {
                this.$notify({title: 'Ошибка сохранения вебинара', text: error.response.data.message, type: 'error'})
                this.disable = false;
            })
        },
        LoadWebinar()
        {
            this.$axios.get(`/api/webinar/${this.webinarId}/get`)
            .then(response => {
                this.webinar = response.data;
                this.disable = false;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки вебинара', text: error.response.data.message, type: 'error'});
                this.disable = true;
            })
        }
    },
    mounted() 
    {
        this.webinarId = this.$route.params.id;

        this.LoadWebinar();
    }
}
</script>

<style>

</style>