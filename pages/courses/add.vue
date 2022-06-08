<template lang="pug">
.col-wrapper
    .col.first
        CourseEditor(@save-course="CreateCourse")
    ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        CreateCourse(course) 
        {
            this.$axios.$post('/api/course/create', course)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Курс успешно создан', type: 'success'});
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