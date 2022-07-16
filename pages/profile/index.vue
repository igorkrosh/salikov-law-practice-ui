<template lang="pug">
.col-wrapper.page-edit
    .col.first
        ProfileUserBlock
        .info.block 
            h2 Информация
            form.card(@submit.prevent="EditProfile" v-if="this.$store.getters.USER.name != undefined")
                .input-wrapper 
                    label Имя
                    input(type="text" placeholder="Иван" v-model="$store.getters.USER.name" readonly)
                .input-wrapper 
                    label Фамилия 
                    input(type="text" placeholder="Иванов" v-model="$store.getters.USER.lastName" readonly)
                .input-wrapper 
                    label Дата рождения  
                    input(type="text" placeholder="24.04.1992" v-maska="'##.##.####'" v-model="$store.getters.USER.birthday" readonly)
                .input-wrapper 
                    label Город
                    input(type="text" placeholder="Москва" v-model="$store.getters.USER.city" readonly)
                .input-wrapper 
                    label Номер телефона
                    input(type="text" placeholder="+7 (912) 345-67-89" v-maska="'+7 (9##) ###-##-##'" v-model="$store.getters.USER.phone" readonly)
                .input-wrapper 
                    label E-mail
                    input(type="email" placeholder="mail@mail.com" v-model="$store.getters.USER.email" readonly)
        //.info.block 
            .card 
                InputFile(name="asd" v-model="file" @input="input")
                button.btn(@click="UploadVideo")
    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Профиль')
    },
    data() {
        return {
            file: ''
        }
    },
    methods: {
        input(file) 
        {
            console.log(file)
            let fileReader = new FileReader()
        },
        UploadVideo()
        {
            let config = {
                method: 'post',
                url: 'https://uploader.kinescope.io/video',
                headers: { 
                    'Authorization': 'Bearer 529e2c9c-7254-4fad-883d-1ba138fec8b3',
                    'X-Project-ID': '36f71d1c-945e-49a8-b8a4-8dd37d329596', 
                    'X-Folder-ID': '', 
                    'X-Video-Title': 'New video', 
                    'X-Video-Description': 'Video description', 
                    'X-File-Name': 'video.mp4', 
                    'Content-Type': 'text/plain'
                },
                data : this.file
            };

            this.$axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style>

</style>