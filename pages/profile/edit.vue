<template lang="pug">
.col-wrapper.page-edit
    .col.first
        ProfileUserBlock(:profile="this.$store.getters.USER")
        .info.block 
            h2 Информация
            form.card(@submit.prevent="EditProfile" v-if="this.$store.getters.USER.name != undefined")
                .input-wrapper 
                    label Имя
                    input(type="text" placeholder="" v-model="user.name")
                .input-wrapper 
                    label Фамилия 
                    input(type="text" placeholder="" v-model="user.lastName")
                .input-wrapper 
                    label Дата рождения  
                    input(type="text" placeholder="" v-maska="'##.##.####'" v-model="user.birthday")
                .input-wrapper 
                    label Город
                    input(type="text" placeholder="" v-model="user.city")
                .input-wrapper 
                    label Номер телефона
                    input(type="text" placeholder="" v-maska="'+7 (9##) ###-##-##'" v-model="user.phone")
                .input-wrapper 
                    label E-mail
                    input(type="email" placeholder="" v-model="user.email")
                .btn-wrapper 
                    button.btn 
                        img(src="/assets/images/icons/edit.png")
                        |Редактировать
        .new-avatar.block 
            h2 Загрузка фото профиля
            .card 
                .avatar-loader
                    ClientOnly
                        PictureInput(
                            ref="pictureInput" 
                            width="400" 
                            height="400" 
                            accept="image/jpeg,image/png" 
                            size="2" 
                            :custom-strings="{drag: 'Перетащите изображение или кликните по форме', change: 'Изменить фото', remove: 'Удалить фото', fileSize: 'Размер изображения не должен превышать 2 Мб'}"
                            button-class="btn blue sm"
                            removeButtonClass="btn blue sm"
                            :removable="true"
                            @change="PictireOnChange"
                        )
                    .center
                        button.btn(@click="UpdatePhoto") Обновить
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            user: {
                name: '',
                lastName: '',
                birthday: '',
                city: '',
                phone: '',
                email: '',
            },
            avatar: null,
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
        },
        SetUser()
        {
            let profile = this.$store.getters.USER;

            this.user.name = profile.name;
            this.user.lastName = profile.lastName;
            this.user.birthday = profile.birthday;
            this.user.city = profile.city;
            this.user.phone = profile.phone;
            this.user.email = profile.email;
        },
        UpdatePhoto()
        {
            let formData = new FormData()
            formData.append('avatar', this.avatar)
            
            this.$axios.$post(`/api/file/user/avatar`, formData)
            .then(response => {
                this.$notify({title: 'Фото обновлено', text: '', type: 'success'})
                this.$store.dispatch('LOAD_PROFILE')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки фото', text: error.response.data.errors.avatar[0], type: 'error'})
            })
        },
        PictireOnChange()
        {
            this.avatar = this.$refs.pictureInput.$el.querySelector('input[type=file]').files[0]
        }
    },
    watch: {
        '$store.getters.USER': function () {
            this.SetUser();
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Редактирование профиля');
        this.SetUser();  
    }
}
</script>

<style lang="scss">
.avatar-loader
{
    width: 100%;

    .center 
    {
        margin-top: 10px;
    }
}
</style>