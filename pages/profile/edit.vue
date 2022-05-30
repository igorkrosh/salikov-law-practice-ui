<template lang="pug">
.col-wrapper.page-edit
    .col.first
        .user.block
            img(src="/assets/images/avatar_big.png", alt="").avatar
            .wrapper
                span {{$store.getters.USER.name}} {{$store.getters.USER.lastName}}
                span.type(v-if="$store.getters.USER.role == 'user'") Слушатель
                span.type(v-if="$store.getters.USER.role == 'admin'") Администратор
                span.type(v-if="$store.getters.USER.role == 'educator'") Преподаватель
        .info.block 
            h2 Информация
            form.card(@submit.prevent="EditProfile" v-if="this.$store.getters.USER.name != undefined")
                .input-wrapper 
                    label Имя
                    input(type="text" placeholder="Иван" v-model="user.name")
                .input-wrapper 
                    label Фамилия 
                    input(type="text" placeholder="Иванов" v-model="user.lastName")
                .input-wrapper 
                    label Дата рождения  
                    input(type="text" placeholder="24.04.1992" v-maska="'##.##.####'" v-model="user.birthday")
                .input-wrapper 
                    label Город
                    input(type="text" placeholder="Москва" v-model="user.city")
                .input-wrapper 
                    label Номер телефона
                    input(type="text" placeholder="+7 (912) 345-67-89" v-maska="'+7 (9##) ###-##-##'" v-model="user.phone")
                .input-wrapper 
                    label E-mail
                    input(type="email" placeholder="mail@mail.com" v-model="user.email")
                .btn-wrapper 
                    button.btn 
                        img(src="/assets/images/icons/edit.png")
                        |Редактировать
    ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                lastName: '',
                birthday: '',
                city: '',
                phone: '',
                email: '',
            }
            
        }
    },
    methods: {
        EditProfile()
        {
            this.$axios.$post('/api/user/edit', this.user)
            .then(response => {
                console.log(response)
                this.$notify({title: 'Успешно', text: 'Данные обновлены.', type: 'success'})
                this.$store.dispatch('SET_USER', {
                    role: response.role,
                    points: response.points,
                    allPoints: response.allPoints,
                    invites: response.invites,
                    name: response.name,
                    lastName: response.lastName,
                    birthday: response.birthday,
                    city: response.city,
                    phone: response.phone,
                    email: response.email,
                    avatar: response.avatar,
                })
            })
            .catch(error => {
                this.$notify({title: 'Ошибка!', text: 'Ошибка отправки формы.', type: 'error'})
            })
        }
    },
    watch: {
        '$store.getters.USER': function () {
            let profile = this.$store.getters.USER;

            this.user.name = profile.name;
            this.user.lastName = profile.lastName;
            this.user.birthday = profile.birthday;
            this.user.city = profile.city;
            this.user.phone = profile.phone;
            this.user.email = profile.email;
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Редактирование профиля')        
    }
}
</script>

<style lang="scss">

</style>