<template lang="pug">
    .user-info(:class="{mobile: mobile}")
        HeaderBtnNotification(v-if="!mobile")
        .user 
            button.btn-lk(@click="active = !active")
                .btn-wrapper
                    img(src="~assets/images/avatar.png", alt="").avatar
                    span Иванов Иван Иванович
                .wrapper(v-if="!mobile")
                    a.btn-menu(v-for="(item, index) in this.menu" :key="index" :href="item.link")
                        .icon
                            img(:src="item.icon", alt="")
                        |{{item.name}}
                    a(href="#").btn-menu
                        .icon
                            img(src="~assets/images/icons/menu/8.png", alt="")
                        |Выход 
            .wrapper(v-if="mobile" :class="{active:active}")
                a.btn-menu(v-for="(item, index) in this.menu" :key="index" :href="item.link")
                    .icon
                        img(:src="item.icon", alt="")
                    |{{item.name}}
                a(href="#").btn-menu
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
            active: false,
            menu: [
                {
                    link: '/profile',
                    icon: '/assets/images/icons/menu/8.png',
                    name: 'Мой профиль'
                },
                {
                    link: '/profile/edit',
                    icon: '/assets/images/icons/menu/8.png',
                    name: 'Редактировать'
                }
            ]
        }
    },
}
</script>

<style>

</style>