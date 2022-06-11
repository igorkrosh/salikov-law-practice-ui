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
    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Профиль')
    }
}
</script>

<style>

</style>