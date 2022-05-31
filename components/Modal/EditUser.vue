<template lang="pug">
Modal(name="edit-user" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    form.card.edit-user(v-if="user" @submit.prevent="EditUser")
        .row
            .input-wrapper 
                label Имя
                input(placeholder="Иван" v-model="user.name")
            .input-wrapper 
                label Фамилия
                input(placeholder="Иванов" v-model="user.last_name")
        .row 
            .input-wrapper 
                label Дата рождения 
                input(placeholder="24.04.1992" v-model="user.birthday")
            .input-wrapper 
                label Город 
                input(placeholder="Москва" v-model="user.city")
        .row 
            .input-wrapper 
                label Номер телефона
                input(placeholder="891234567890" v-model="user.phone")
            .input-wrapper 
                label E-mail
                input(placeholder="mail@mail.com" v-model="user.email")
        .row 
            .input-wrapper 
                label Сменить пароль
                input(placeholder="password" type="password" v-model="password")
            .input-wrapper 
                label Подтвердите пароль
                input(placeholder="password" type="password" v-model="password_confirmation")
        .center
            .select-wrapper 
                label Уровень доступа 
                select(v-model="user.role")
                    option(value="user") Ученик 
                    option(value="educator") Преподователь 
                    option(value="admin") Администратор 
        //.row 
            .select-wrapper 
                label Записан на курсы 
                select 
                    option Список курсов
            .select-wrapper 
                label Пройденые курсы 
                select 
                    option Список курсов 
        .center.btn-wrapper
            button.btn.sm Изменить
            button.btn.blue.sm(@click.prevent="$modal.hide('edit-user')") Закрыть
</template>

<script>
export default {
    props: ['user'],
    data() {
        return {
            password: '',       
            password_confirmation: '',
        }
    },
    methods: {
        EditUser()
        {
            this.user['password'] = this.password;
            this.user['password_confirmation'] = this.password_confirmation;

            this.$axios.$post(`/api/user/${this.user.id}/edit`, this.user)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Пользователь изменен', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка', text: error.response.data.message, type: 'error'})
            })
        }
    }
}
</script>

<style>

</style>