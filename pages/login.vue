<template lang="pug">
.card 
    .center
        h2 Вход
    form.wrapper(@submit.prevent="Login")
        .validation-type 
            .type(:class="{active: type == 'password'}" @click="type = 'password'") Пароль
            .type(:class="{active: type == 'email'}" @click="type = 'email'") Email
            .type(:class="{active: type == 'sms'}" @click="type = 'sms'") SMS
        .input-wrapper(:class="{error: error.email}" v-if="type != 'sms'")
            label Email
            span.msg(v-if="error && error.email") {{error.email[0]}}
            input(type="email" v-model="email" required ref="email")
        .input-wrapper(:class="{error: error.phone}" v-else)
            label Телефон
            span.msg(v-if="error && error.phone") {{error.phone[0]}}
            input(type="phone" v-model="phone" required ref="phone" v-maska="'+7 (9##) ###-##-##'")
        .input-wrapper(:class="{error: error.password}" v-if="type == 'password'")
            label Пароль 
            span.msg(v-if="error && error.password") {{error.password[0]}}
            input(type="password" v-model="password" required)
        .input-wrapper(:class="{error: error.code}" v-if="type != 'password'")
            label Код подтверждения 
            span.msg(v-if="error && error.code") {{error.code[0]}}
            .validation-code
                input(type="text" v-model="code" required)
                button.btn.sm.blue(@click.prevent="GetCode" :class="{disable: timeout > 0}") {{btnText}}
        .center 
            button.btn Войти
    .center.register-wrapper 
        NuxtLink(to="/register").link Регистрация
    
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            email: '',
            password: '',
            code: '',
            phone: '',
            error: [],
            type: 'password',
            btnText: 'Получить код',
            timeout: 0,
            timeId: 0,
        }
    },
    methods: {
        Login() 
        {
            this.error = []

            switch (this.type) 
            {
                case 'password':
                    this.LoginByPassword()
                    break;
                case 'email':
                    this.LoginByEmail()
                    break;
                case 'sms':
                    this.LoginBySms()
                    break;
                default:
                    break;
            }
            
        },
        GetCode()
        {
            switch (this.type) 
            {
                case 'email':
                    this.SendCodeEmail()
                    break;
                case 'sms':
                    this.SendCodeSms();
                    break
                default:
                    break;
            }

            return;
        },
        SuccessLogin()
        {
            if (this.$auth.user.email_verified_at == null)
            {
               this.$router.push('/register/verification') 
            }
            else 
            {
                if (window.history.length > 2)
                {
                    this.$router.back();
                }
                else 
                {
                    this.$router.push('/dashboard')
                }
            }
        },
        LoginByPassword() {
           this.$auth.loginWith('laravelPassword', {
                data: {
                    email: this.email,
                    password: this.password
                },
            }).then(response => {
                console.log(response.data.user)
                //this.$auth.setUser(response.data.user)
                this.SuccessLogin()
            })
            .catch(errors => {
                console.log(errors.response.data.errors)
                this.error = errors.response.data.errors
            })
        },
        LoginByEmail()
        {
            console.log('asd')
            this.$auth.loginWith('laravelEmail', {
                data: {
                    email: this.email,
                    code: this.code,
                }
            })
            .then(response => {
                this.SuccessLogin()
            })
            .catch(errors => {
                console.log(errors.response.data.errors)
                this.error = errors.response.data.errors
            })
        },
        LoginBySms()
        {
            this.$auth.loginWith('laravelSms', {
                data: {
                    phone: this.phone,
                    code: this.code,
                }
            })
            .then(response => {
                this.SuccessLogin()
            })
            .catch(errors => {
                console.log(errors.response.data.errors)
                this.error = errors.response.data.errors
            })
        },
        BlockSendBtn()
        {
            this.timeout = 60;
            this.timeId = setInterval(function () {
                this.timeout--;
                this.btnText = `Повторить (${this.timeout})`
                if (this.timeout == 0)
                {
                    clearInterval(this.timeId)
                    this.btnText = 'Получить код';
                }
            }.bind(this), 1000)
        },
        SendCodeEmail()
        {
            this.error = [];

            if (!this.$refs.email.checkValidity())
            {
                this.error = {
                    email: ['Поле обязательно для заполнения']
                }

                return;
            }

            this.$axios.$post(`/api/auth/code/email/send`, {
                email: this.email
            })
            .then(response => {
                if (response.status == 'queued')
                {
                    this.$notify({title: 'Код отправлен', text: 'Проверьте вашу почту'})
                    this.BlockSendBtn()
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки кода', text: error.response.data.message, type: 'error'});
                this.error = error.response.data.errors
            })
        },
        SendCodeSms()
        {
            this.error = [];
            
            this.$axios.$post(`/api/auth/code/sms/send`, {
                phone: this.phone
            })
            .then(response => {
                if (response.status == 'success')
                {
                    this.$notify({title: 'Код отправлен'})
                    this.BlockSendBtn()
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки кода', text: error.response.data.message, type: 'error'});
                this.error = error.response.data.errors
            })
        }

    },
    mounted()
    {
        this.$store.dispatch('SET_PAGETITLE', '')

        console.log(this.$router)

        if (this.$auth.loggedIn)
        {
            this.$router.push('/dashboard')
        }
    }

}
</script>

<style lang="scss">


</style>