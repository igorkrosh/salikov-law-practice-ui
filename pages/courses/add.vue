<template lang="pug">
    .col-wrapper
        .col.first
            .page-add-course 
                .block
                    .card.course-name 
                        span Название курса 
                        textarea
                            |Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки
                .block 
                    h2 Блоки курса 
                    .card.course-bloks
                        b Блок №1
                        .btn-wrapper
                            button.btn Стрим-ссылка 
                            button.btn Видео-запись
                            button.btn.blue Задания
                            button.btn.blue Тесты
                        .input-wrapper 
                            label Стрим-ссылка:
                            .input
                                input(placeholder="https://www.ya.ru")
                        .input-wrapper 
                            label Ссылка на видео-запись:
                            .input
                                input(placeholder="https://www.youtube.com")
                        .input-wrapper 
                            label Задания:
                            .input
                                input(placeholder="2 задания")
                        .input-wrapper 
                            label Тесты:
                            .input
                                input(placeholder="1 тест")
                    CourseBlock(:count="count" v-for="(item, index) in count" :key="index")
                    .add-block
                        button.btn.blue(@click="count++") Добавить блок
                    .couse-info 
                        .input-wrapper 
                            label Дата начала:
                            input(placeholder="04.05.2022")
                        .input-wrapper 
                            label Задания:
                            input(placeholder="2 недели")
                        .btn-wrapper
                            button.btn Сохранить

        ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Добавить курс')
    }
}
</script>

<style lang="scss">
    
</style>