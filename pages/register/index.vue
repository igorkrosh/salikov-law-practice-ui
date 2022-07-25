<template lang="pug">
.card 
    .center
        h2 Регистрация
    .wrapper
        .input-wrapper(ref="name")
            label 
                |Имя 
                span.required *
            span.msg(v-if="error && error.name") {{error.name[0]}}
            input(type="text" v-model="name")
        .input-wrapper(ref="email")
            label 
                |Email 
                span.required *
            span.msg(v-if="error && error.email") {{error.email[0]}}
            input(type="email" v-model="email")
        .input-wrapper(ref="password")
            label 
                |Пароль 
                span.required *
            span.msg(v-if="error && error.password") {{error.password[0]}}
            input(type="password" v-model="password")
        .input-wrapper(ref="password_confirmation")
            label 
                |Подтвердите пароль 
                span.required *
            input(type="password" v-model="password_confirmation")
    .center 
        button.btn(@click="Register") Зарегистрировать
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            name: '',
            email: '',
            password: '',       
            password_confirmation: '',
            error: null
        }
    },
    methods: {
        async Register() {
            let inputKeys = ['name', 'email', 'password', 'password_confirmation'];

            for (let key of inputKeys) 
            {
                this.$refs[key].classList.remove('error')
            }
            this.error = null;
            await this.$axios.post('/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
            .then(response => {
                this.$notify({title: 'Пользователь зарегистрирован', text: 'Вы будете перенаправлены на страницу подтверждения', type: 'success'})
                this.$router.push('/register/verification');
            })
            .catch(error => {
                this.$notify({title: 'Ошибка заполнения формы', text: 'Пожалуйста, проверте правильность отправляемой формы', type: 'error'})
                
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

}
</script>

<style>

</style>