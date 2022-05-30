<template lang="pug">
.col-wrapper 
    .col.first.page-users 
            .filters-radio
                label.radio Все
                    input(type="radio")
                    span.checkmark
                label.radio Администраторы
                    input(type="radio")
                    span.checkmark
                //label.radio Менеджеры
                    input(type="radio")
                    span.checkmark
                label.radio Преподователь
                    input(type="radio")
                    span.checkmark
                label.radio Ученики
                    input(type="radio")
                    span.checkmark
                //label.radio Авторы
                    input(type="radio")
                    span.checkmark
            .filters-input 
                input.filter(placeholder="Поиск по имени")
                select.filter
                    option Поиск по направлению
                input.filter(placeholder="Поиск по курсу")
            .table 
                .item(v-for="index in 44" :key="index" @click="EditUser")
                    span.name Иванов Иван Иванович 
                    span.role Преподаватель
            .navs 
                span.active 1
                span 2
                span 3 
                span ... 
                span 28

    ProfileColumnInfo
    ModalEditUser    
</template>

<script>
export default {
    methods: {
        EditUser()
        {
            this.$modal.show('edit-user');
        },
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Пользователи')
    }
}
</script>

<style lang="scss">

</style>