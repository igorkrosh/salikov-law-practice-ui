<template lang="pug">
    .col-wrapper.page-edit
        .col.first
            .user.block
                img(src="/assets/images/avatar_big.png", alt="").avatar
                .wrapper
                    span Иванов Иван Иванович
                    span.type Слушатель
            .info.block 
                h2 Информация
                form.card 
                    .input-wrapper 
                        label Имя
                        input(type="text" placeholder="Иван")
                    .input-wrapper 
                        label Фамилия 
                        input(type="text" placeholder="Иванов")
                    .input-wrapper 
                        label Дата рождения  
                        input(type="text" placeholder="24.04.1992")
                    .input-wrapper 
                        label Город
                        input(type="text" placeholder="Москва")
                    .input-wrapper 
                        label Номер телефона
                        input(type="text" placeholder="891234567890")
                    .input-wrapper 
                        label E-mail
                        input(type="text" placeholder="mail@mail.com")
                    .btn-wrapper 
                        button.btn 
                            img(src="/assets/images/icons/edit.png")
                            |Редактировать
            .info.block 
                h2 Блок для тестирования
                .card 
                    .btn-wrapper 
                        button.btn(@click="SetRole('user')") Роль: Пользователь
                    .btn-wrapper(@click="SetRole('educator')")
                        button.btn Роль: Преподаватель
                    .btn-wrapper(@click="SetRole('admin')")
                        button.btn Роль: Администратор
        ProfileColumnInfo
</template>

<script>
export default {
    methods: {
        SetRole(role)
        {
            this.$store.dispatch('SET_USER', {
                role: role,
                points: 35000,
                allPoints: 712136,
                invites: 12,
                name: 'Иванов Иван Иванович',
                avatar: '',
            })
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Редактирование профиля')
    }
}
</script>

<style lang="scss">

</style>