<template lang="pug">
.root
    ProfileUserBlock(:profile="profile")
    .info.block 
        h2 Информация
        form.card(v-if="profile")
            .input-wrapper 
                label Имя
                input(type="text" placeholder="" v-model="profile.name" readonly)
            .input-wrapper 
                label Фамилия 
                input(type="text" placeholder="" v-model="profile.lastName" readonly)
            .input-wrapper 
                label Дата рождения  
                input(type="text" placeholder="" v-maska="'##.##.####'" v-model="profile.birthday" readonly)
            .input-wrapper 
                label Город
                input(type="text" placeholder="" v-model="profile.city" readonly)
            .input-wrapper 
                label Номер телефона
                input(type="text" placeholder="" v-maska="'+7 (9##) ###-##-##'" v-model="profile.phone" readonly)
            .input-wrapper 
                label E-mail
                input(type="email" placeholder="" v-model="profile.email" readonly)
</template>

<script>
export default {
    props: ['profile']
}
</script>

<style>

</style>