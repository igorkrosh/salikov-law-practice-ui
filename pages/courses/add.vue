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
        CreateCourse(course, cover) 
        {
            let formData = new FormData()
            formData.append("course", JSON.stringify(course));

            if (course.blocks)
            {
                for (let block of course.blocks)
                {
                    if (block.modules)
                    {
                        for (let module of block.modules)
                        {
                            if (module.new_files)
                            {
                                for (let newFile of module.new_files)
                                {
                                    if (!newFile)
                                    {
                                        continue
                                    }

                                    formData.append(newFile.id, newFile.file)    
                                }
                            }

                            if (module.type == 'video')
                            {
                                formData.append(module.fileId, module.file)    
                            }
                        }
                    }
                }
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