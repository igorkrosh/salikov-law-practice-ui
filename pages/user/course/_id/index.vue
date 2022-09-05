<template lang="pug">
.col-wrapper.page-course-detail
    .col.first
        .wrapper(v-if="course")
            h2 Курс: {{course.name}}
            .course-info 
                span Приобретен: {{new Date(course.buy_at).toLocaleDateString('ru-RU')}}
                span Продолжительность: {{course.hours}} ак. ч.
                span Уроки: {{course.lessons}}
            h3 Модули курса:
            CourseModule(v-for="(item, index) in modules" :module="item" :key="index") 
            ReviewEditor(type="course" :id="courseId")
    ProfileColumnCourse
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            course: null,
            courseId: 0,
            modules: [
            ]
        }
    },
    methods: {
        LoadCourseConfig()
        {
            this.$axios.$get(`/api/course/${this.courseId}/get`)
            .then(response => {
                this.course = response;
                this.ParseModules();
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки курса', text: error.response.data.message, type: 'error'})
            })
        },
        ParseModules()
        {
            let result = []; 
            let index = 0;

            for (let block of this.course.blocks)
            {
                index++;
                
                result.push({
                    count: `Модуль ${index}.`,
                    title: block.title,
                    data: [],
                    access: block.access
                })

                for (let module of block.modules)
                {
                    let date;

                    switch (module.type) 
                    {
                        case 'stream':
                            date = module.date;
                            break;
                        case 'job':
                            date = module.deadline;
                            break;
                        case 'test':
                            date = module.deadline;
                            break;
                        default:
                            date = ''
                            break;
                    }
                    result[index - 1].data.push({
                        icon: module.status,
                        date: date,
                        title: module.title,
                        educator: module.authors,
                        type: module.type,
                        link: `/user/course/${this.courseId}/${module.type}/${module.id}`,
                        access: module.access
                    })
                }
            }

            this.modules = result;
        }
    },
    mounted() 
    {
        this.courseId = this.$route.params.id;
        this.$store.dispatch('SET_PAGETITLE', 'Детали курса');
        this.LoadCourseConfig();
    }
}
</script>

<style lang="scss">

</style>