<template lang="pug">
.col-wrapper
    .col.first
        CourseEditor(@save-course="EditCourse" v-show="course" :enterData="course" :class="{disable: disable}")
    ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
            course: {},
            courseId: 0,
            disable: true
        }
    },
    methods: {
        EditCourse(course)
        {
            this.disable = true;
            this.$axios.$post(`/api/course/${this.courseId}/edit`, course)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Курс сохранен', type: 'success'})
                //this.LoadCourse();
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