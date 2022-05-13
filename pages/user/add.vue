<template lang="pug">
    .col-wrapper 
        .col.first 
            .block 
                h2 Информация:
                .card 
                    .row
                        .input-wrapper 
                            label Имя
                            input(placeholder="Иван")
                        .input-wrapper 
                            label Фамилия
                            input(placeholder="Иванов")
                    .row 
                        .input-wrapper 
                            label Дата рождения 
                            input(placeholder="24.04.1992")
                        .input-wrapper 
                            label Город 
                            input(placeholder="Москва")
                    .row 
                        .input-wrapper 
                            label Номер телефона
                            input(placeholder="891234567890")
                        .input-wrapper 
                            label E-mail
                            input(placeholder="mail@mail.com")
                    .row 
                        .input-wrapper 
                            label Логин
                            input(placeholder="login")
                        .input-wrapper 
                            label Пароль
                            input(placeholder="password")
                    .center
                        .select-wrapper 
                            label Уровень доступа 
                            select
                                option Преподователь 
                    .center 
                        button.btn Сохранить
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Добавить пользователя')
    }
}
</script>

<style>

</style>