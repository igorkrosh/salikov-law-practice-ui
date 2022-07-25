<template lang="pug">
.col-wrapper.page-add-course
    .col.first
        CourseEditor(@save-course="CreateCourse")
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
        }
    },
    methods: {
        CreateCourse(course, cover, files) 
        {
            let formData = new FormData()
            formData.append("course", JSON.stringify(course));

            for (let file of files) 
            {
                formData.append(file.fileId, file.file)    
            }

            this.$axios.$post('/api/course/create', formData)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Курс успешно создан', type: 'success'});

                if (cover != null)
                {
                    let formData = new FormData()
                    formData.append('cover', cover)

                    this.$axios.$post(`/api/file/course/${response.id}/cover`, formData)
                    .then(response => {})
                    .catch(error => {
                        this.$notify({title: 'Ошибка загрузки обложки курса', text: error.response.data.message, type: 'error'})
                    })
                }
                

                this.$router.push('/dashboard');
            }) 
            .catch(error => {
                this.$notify({title: 'Ошибка', text: 'Ошибка создания курса', type: 'error'});
            })
        },
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Добавить курс')
    }
}
</script>

<style lang="scss">
    
</style>