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
                    CourseBlock(:count="count" v-for="(item, index) in count" :key="index")
                    .add-block
                        button.btn.blue(@click="count++") Добавить блок
                    .couse-info 
                        .input-wrapper 
                            label Авторы:
                            input(placeholder="Иванов И.И.")
                        .input-wrapper 
                            label Дата начала:
                            input(placeholder="04.05.2022")
                        .input-wrapper 
                            label Продолжительность:
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