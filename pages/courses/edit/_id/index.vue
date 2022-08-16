<template lang="pug">
.col-wrapper.page-add-course 
    .col.first
        CourseEditor(@save-course="EditCourse" v-show="course" :enterData="course" :class="{disable: disable}")
    ProfileColumnEditor
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            course: {},
            courseId: 0,
            disable: true
        }
    },
    methods: {
        EditCourse(course, cover)
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

            //this.disable = true;

            this.$axios.$post(`/api/course/${this.courseId}/edit`, formData)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Курс сохранен', type: 'success'})
                
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
                this.$notify({title: 'Ошибка сохранения курса', text: error.response.data.message, type: 'error'})
                this.disable = false;
            })
        },
        LoadCourse()
        {
            this.$axios.get(`/api/course/${this.courseId}/get`)
            .then(response => {
                this.course = response.data;
                this.disable = false;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки курса', text: error.response.data.message, type: 'error'});
                this.disable = true;
            })
        }
    },
    mounted()
    {
        this.courseId = this.$route.params.id;

        this.LoadCourse();
    }
}
</script>

<style>

</style>