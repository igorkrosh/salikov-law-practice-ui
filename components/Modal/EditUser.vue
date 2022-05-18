<template lang="pug">
Modal(name="edit-user" height="700" classes="dialog" :adaptive="true" )
    .card.edit-user 
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
        .row 
            .select-wrapper 
                label Записан на курсы 
                select 
                    option Список курсов
            .select-wrapper 
                label Пройденые курсы 
                select 
                    option Список курсов 
        .center
            button.btn(@click="$modal.hide('edit-user')") Закрыть
</template>

<script>
export default {

}
</script>

<style>

</style>