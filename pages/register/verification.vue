<template lang="pug">
.card 
    .center
        h2 Подтверждение почты
    .wrapper
        .input-wrapper(:class="{error: error.code}")
            label Код подтверждения 
            span.msg(v-if="error && error.code") {{error.code[0]}}
            .validation-code
                input(type="text" v-model="code" required)
                button.btn.sm.blue(@click.prevent="GetCode" :class="{disable: timeout > 0}") {{btnText}}
    .center 
        button.btn(@click="VerificateMail") Отправить код
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            error: [],
            code: '',
            timeout: 0,
            timeId: 0,
            btnText: 'Получить код'
        }
    },
    methods: {
        GetCode()
        {
            this.$axios.$post(`/api/auth/code/email/send`, {
                email: this.$auth.user.email
            })
            .then(response => {
                if (response.status == 'queued')
                {
                    this.$notify({title: 'Код отправлен', text: 'Проверьте вашу почту'})

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
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки кода', text: error.response.data.message, type: 'error'});
            })
        },
        VerificateMail()
        {
            this.$axios.$post(`/api/auth/verificate/email`, {
                code: this.code
            })
            .then(response => {
                this.$notify({title: 'Успешно', text: '', type: 'success'});

                if (this.$auth.loggedIn)
                {
                    this.$auth.fetchUser()
                    .then(() => {
                        this.$router.push('/dashboard');
                    })
                }
                else 
                {
                    this.$auth.loginWith('laravelPassword', {
                        data: {
                            email: this.$auth.user.email,
                            password: this.$auth.user.password
                        },
                    }).then(response => {
                        this.$notify({title: 'Почта подтверждена', type: 'success'});
                    })
                    .catch(errors => {
                        console.log(errors.response.data.errors)
                        this.error = errors.response.data.errors
                    })
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки кода', text: error.response.data.message, type: 'error'});
            })

        }
    },
    mounted() {
    }
    
}
</script>

<style>

</style>