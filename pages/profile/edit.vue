<template lang="pug">
    .col-wrapper.page-edit
        .col.first
            .user.block
                img(src="/assets/images/avatar_big.png", alt="").avatar
                .wrapper
                    span Иванов Иван Иванович
                    span.type Слушатель
            .info.block 
                h2 Информация
                form.card 
                    .input-wrapper 
                        label Имя
                        input(type="text" placeholder="Иван")
                    .input-wrapper 
                        label Фамилия 
                        input(type="text" placeholder="Иванов")
                    .input-wrapper 
                        label Дата рождения  
                        input(type="text" placeholder="24.04.1992")
                    .input-wrapper 
                        label Город
                        input(type="text" placeholder="Москва")
                    .input-wrapper 
                        label Номер телефона
                        input(type="text" placeholder="891234567890")
                    .input-wrapper 
                        label E-mail
                        input(type="text" placeholder="mail@mail.com")
                    .btn-wrapper 
                        button.btn 
                            img(src="/assets/images/icons/edit.png")
                            |Редактировать
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Редактирование профиля')
    }
}
</script>

<style lang="scss">

</style>