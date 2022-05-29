<template lang="pug">
.user-info(:class="{mobile: mobile}")
    HeaderBtnNotification(v-if="!mobile")
    .user 
        button.btn-lk(@click="active = !active")
            .btn-wrapper
                img(src="/assets/images/avatar.png", alt="").avatar
                span Иванов Иван Иванович
            .wrapper(v-if="!mobile")
                a.btn-menu(v-for="(item, index) in this.menu" :key="index" :href="item.link")
                    .icon
                        img(:src="item.icon", alt="")
                    |{{item.name}}
                a(href="#" @click="Logout").btn-menu
                    .icon
                        img(src="/assets/images/icons/profile/3.png", alt="")
                    |Выход 
        .wrapper(v-if="mobile" :class="{active:active}")
            a.btn-menu(v-for="(item, index) in this.menu" :key="index" :href="item.link")
                .icon
                    img(:src="item.icon", alt="")
                |{{item.name}}
            a(href="#" @click="Logout").btn-menu
                .icon
                    img(src="/assets/images/icons/profile/3.png", alt="")
                |Выход 
        .score(v-if="!mobile && this.$store.getters.USER.points != undefined") У вас: {{this.$store.getters.USER.points.toLocaleString('ru')}} баллов
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
            active: false,
            menu: [
                {
                    link: '/profile',
                    icon: '/assets/images/icons/profile/2.png',
                    name: 'Мой профиль'
                },
                {
                    link: '/profile/edit',
                    icon: '/assets/images/icons/profile/1.png',
                    name: 'Редактировать'
                }
            ]
        }
    },
    methods: {
        Logout()
        {
            this.$axios.post('/api/logout')
            .then(response => {
                this.$router.push('/login')
            })
            .catch(error => {
                this.$notify({
                    title: 'Ошибка завершения сеанса',
                    text: error.response.data.message,
                    type: 'error'
                })
            })
        }
    }
}
</script>

<style>

</style>