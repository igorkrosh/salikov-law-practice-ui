<template lang="pug">
    .menu-wrapper
        .menu(:class="{active:active}")
            NuxtLink(v-for="(item, index) in this.menu[this.$store.getters.USER.role]" :key="index" :to="item.link").btn-menu
                .icon 
                    img(:src="item.icon", alt="")
                |{{item.name}}
            .support 
                a(href="").btn-menu
                    .icon
                        img(src="~assets/images/icons/menu/8.png", alt="")
                    |Поддержка
                .user-wrapper
                    HeaderBtnNotification
                    HeaderUserInfo(mobile=true)
        .btn-show-menu(@click="active = !active" :class="{active:active}")
            span
</template>

<script>
export default {
    data() {
        return {
            menu: {
                user: [
                    {
                        link: '/',
                        icon: '/assets/images/icons/menu/1.png',
                        name: 'Моё обучение'
                    },
                    {
                        link: '/events',
                        icon: '/assets/images/icons/menu/2.png',
                        name: 'События'
                    },
                    {
                        link: '/callback',
                        icon: '/assets/images/icons/menu/3.png',
                        name: 'Обратная связь'
                    },
                    {
                        link: '/courses',
                        icon: '/assets/images/icons/menu/4.png',
                        name: 'Курсы'
                    },
                    {
                        link: '/webinars',
                        icon: '/assets/images/icons/menu/5.png',
                        name: 'Вебинары'
                    },
                    {
                        link: '/referral',
                        icon: '/assets/images/icons/menu/6.png',
                        name: 'Реферальная программа'
                    },
                    {
                        link: '/certificates',
                        icon: '/assets/images/icons/menu/7.png',
                        name: 'Мои сертификаты'
                    },
                    {
                        link: '/taken',
                        icon: '/assets/images/icons/menu/8.png',
                        name: 'Пройденые курсы'
                    }
                ]
            },
            active: false
        }
    }
}
</script>

<style lang="scss">

</style>