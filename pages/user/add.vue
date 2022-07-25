<template lang="pug">
.col-wrapper 
    .col.first 
        .block 
            h2 Информация:
            form.card(@submit.prevent="CreateUser") 
                .row
                    .input-wrapper(ref="name")
                        label 
                            |Имя
                            span.required *
                        span.msg(v-if="error && error.name") {{error.name[0]}}
                        input(placeholder="Иван" v-model="user.name")
                    .input-wrapper 
                        label Фамилия
                        input(placeholder="Иванов" v-model="user.lastName")
                .row 
                    .input-wrapper 
                        label Дата рождения 
                        input(placeholder="24.04.1992" v-maska="'##.##.####'" v-model="user.birthday")
                    .input-wrapper 
                        label Город 
                        input(placeholder="Москва" v-model="user.city")
                .row 
                    .input-wrapper 
                        label Номер телефона
                        input(placeholder="+7 (912) 345-67-89" v-maska="'+7 (9##) ###-##-##'" v-model="user.phone")
                    .input-wrapper(ref="email")
                        label 
                            |E-mail
                            span.required *
                        span.msg(v-if="error && error.email") {{error.email[0]}}
                        input(placeholder="mail@mail.com" type="email" v-model="user.email")
                .row 
                    .input-wrapper(ref="password")
                        label(ref="password")
                            |Пароль
                            span.required *
                        span.msg(v-if="error && error.password") {{error.password[0]}}
                        input(type="password" v-model="user.password")
                    .input-wrapper(ref="password_confirmation")
                        label 
                            |Подтвердите пароль 
                            span.required *
                        span.msg(v-if="error && error.password") {{error.password[0]}}
                        input(type="password" v-model="user.password_confirmation")
                .center
                    .select-wrapper 
                        label Уровень доступа 
                        select(v-model="user.role")
                            option(value="user") Слушатель 
                            option(value="educator") Преподователь 
                            option(value="admin") Администратор 
                .center 
                    button.btn Сохранить
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() 
    {
        return {
            user: {
                name: '',
                lastName: '',
                birthday: '',
                city: '',
                phone: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: 'user',
            },
            error: null
        }
    },
    methods: 
    {
        CreateUser() 
        {
            let inputKeys = ['name', 'email', 'password', 'password_confirmation'];

            for (let key of inputKeys) 
            {
                this.$refs[key].classList.remove('error')
            }

            this.$axios.post('/api/user/create', this.user)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Пользователь создан', type: 'success'})

                this.user = {
                    name: '',
                    lastName: '',
                    birthday: '',
                    city: '',
                    phone: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    role: 'user',
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создание пользователя', text: 'Форма содержит ошибки', type: 'error'})

                let inputKeys = Object.keys(error.response.data.errors)
                this.error = error.response.data.errors

                for (let key of inputKeys) 
                {
                    if (key == 'password')
                    {
                        this.$refs['password'].classList.add('error')
                        this.$refs['password_confirmation'].classList.add('error')

                        continue
                    }

                    this.$refs[key].classList.add('error')
                }
            })
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Добавить пользователя')
    }
}
</script>

<style>

</style>