<template lang="pug">
.card 
    .center
        h2 Вход
    .wrapper
        .input-wrapper(ref="email")
            label Email
            span.msg(v-if="error && error.email") {{error.email[0]}}
            input(type="email" v-model="login")
        .input-wrapper(ref="password")
            label Пароль 
            input(type="password" v-model="password")
    .center 
        button.btn(@click="Login") Войти
    .center.register-wrapper 
        NuxtLink(to="/register").link Регистрация
    
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            login: '',
            password: '',
            error: null
        }
    },
    methods: {
        async Login() 
        {
            this.$refs['email'].classList.remove('error')
            this.$axios.$post('/api/login', {
                email: this.login,
                password: this.password
            })
            .then(response => {
                this.$router.push({ path: '/dashboard' });
                this.$notify({title: 'Вход выполнен', text: 'Добро пожаловать', type: 'success'})
            })
            .catch(errors => {
                console.log(errors.response.data.errors.email[0])
                this.error = errors.response.data.errors
                this.$refs['email'].classList.add('error')
            })
        }
    },

}
</script>

<style lang="scss">
.link 
{
    font-size: 14px;
    color: #354c55;
}

.register-wrapper 
{
    margin-top: 15px;
}

</style>