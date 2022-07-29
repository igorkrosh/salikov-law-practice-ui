<template lang="pug">
.card
    .center
        h2 Регистрация
    .wrapper
        .validation-type.register
            .type(:class="{active: jurictic == false}" @click="jurictic = false") Физ. лицо
            .type(:class="{active: jurictic == true}" @click="jurictic = true") Юр. лицо
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
        .input-row
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
        .juristic-wrapper(v-if="jurictic == true")
            .input-wrapper(ref="company_name")
                label 
                    |Название компании
                    span.required *
                input(type="text" v-model="company_name")
            .input-row
                .input-wrapper(ref="inn")
                    label 
                        |ИНН
                        span.required *
                    input(type="text" v-model="inn")
                .input-wrapper(ref="ogrn")
                    label ОГРН
                    input(type="text" v-model="ogrn")
            .input-wrapper(ref="account")
                label Рассчетный счет
                input(type="text" v-model="account")
            .input-wrapper(ref="address")
                label Адрес
                input(type="text" v-model="address")
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
            error: null,
            jurictic: false,
            company_name: '',
            inn: '',
            ogrn: '',
            account: '',
            address: '',
        }
    },
    methods: {
        Register() {
            let inputKeys = ['name', 'email', 'password', 'password_confirmation'];

            for (let key of inputKeys) 
            {
                this.$refs[key].classList.remove('error')
            }
            this.error = null;
            this.$axios.post('/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
                jurictic: this.jurictic,
                company_name: this.company_name,
                inn: this.inn,
                ogrn: this.ogrn,
                account: this.account,
                address: this.address
            })
            .then(response => {
                this.$notify({title: 'Пользователь зарегистрирован', text: 'Вы будете перенаправлены на страницу подтверждения', type: 'success'})
                this.$auth.setUser({
                    email: this.email,
                    password: this.password,
                })
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

<style lang="scss">
.validation-type.register
{
    .type 
    {
        width: 50%;
    }
}

.login-page .card .wrapper .input-row .input-wrapper
{
        width: 48%;
}

.input-row
{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .input-wrapper 
    {
    }
}
</style>