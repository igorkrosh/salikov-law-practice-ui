<template lang="pug">
    .menu-wrapper(:class="{hide:hide}")
        .menu(:class="{active:active}")
            NuxtLink(v-for="(item, index) in this.menu[this.$store.getters.USER.role]" :key="index" :to="item.link").btn-menu
                .icon 
                    img(:src="item.icon", alt="")
                span {{item.name}}
            .support 
                NuxtLink(to="/support").btn-menu.hover
                    .icon
                        img(src="/assets/images/icons/menu/support.png", alt="")
                    |Поддержка
                .user-wrapper
                    HeaderBtnNotification
                    HeaderUserInfo(mobile=true)
        .btn-show-menu(@click="active = !active" :class="{active:active}")
            span
        button.hide-menu(@click="HideMenu")
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
                        link: '/user/courses',
                        icon: '/assets/images/icons/menu/4.png',
                        name: 'Курсы'
                    },
                    {
                        link: '/user/webinars',
                        icon: '/assets/images/icons/menu/5.png',
                        name: 'Вебинары'
                    },
                    {
                        link: '/referral',
                        icon: '/assets/images/icons/menu/6.png',
                        name: 'Реферальная программа'
                    },
                    /*
                    {
                        link: '/certificates',
                        icon: '/assets/images/icons/menu/7.png',
                        name: 'Мои сертификаты'
                    },
                    */
                    {
                        link: '/user/done',
                        icon: '/assets/images/icons/menu/8.png',
                        name: 'Пройденые курсы'
                    }
                ],
                admin: [
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
                        link: '/',
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
                        link: '/user/add',
                        icon: '/assets/images/icons/menu/user.png',
                        name: 'Добавить пользователя'
                    },
                    {
                        link: '/user/all',
                        icon: '/assets/images/icons/menu/group.png',
                        name: 'Пользователи'
                    },
                ],
                educator: [
                    {
                        link: '/',
                        icon: '/assets/images/icons/menu/1.png',
                        name: 'Мои курсы'
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
                        link: '/webinars',
                        icon: '/assets/images/icons/menu/5.png',
                        name: 'Вебинары'
                    },
                    {
                        link: '/referral',
                        icon: '/assets/images/icons/menu/6.png',
                        name: 'Реферальная программа'
                    },
                ],
            },
            
            active: false,
            hide: false
        }
    },
    methods: {
        HideMenu()
        {
            this.hide = !this.hide;
            this.$emit('menu-hide')
        },
        TransitionEnd()
        {
            console.log('end')
        }
    }
}
</script>

<style lang="scss">

</style>