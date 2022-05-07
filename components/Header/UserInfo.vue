<template lang="pug">
    .user-info(:class="{mobile: mobile}")
        HeaderBtnNotification(v-if="!mobile")
        .user 
            button.btn-lk
                img(src="~assets/images/avatar.png", alt="").avatar
                span(v-if="!mobile") Иванов Иван Иванович
                .wrapper 
                    a(href="").btn-menu
                        .icon
                            img(src="~assets/images/icons/menu/8.png", alt="")
                        |Мой профиль  
                    a(href="").btn-menu
                        .icon
                            img(src="~assets/images/icons/menu/8.png", alt="")
                        |Редактировать 
                    a(href="").btn-menu
                        .icon
                            img(src="~assets/images/icons/menu/8.png", alt="")
                        |Выход 
            .score(v-if="!mobile") У вас: {{points.toLocaleString('ru')}} баллов
</template>

<script>
export default {
    props: {
        mobile: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            points: 35000,
        }
    },
}
</script>

<style>

</style>