<template lang="pug">
.root
    section.lk 
        Header(ref="header")
        .page
            .container 
                .content(:class="{'hide-menu':menuHide}")
                    Menu(@menu-hide="HideMenu")
                    Nuxt
            .bg-white(ref="bgWhite" :class="{hide: this.$store.getters.DISABLE_BG_WHITE}")
        NotificationsSystem
    footer
        .container 
            .wrapper
                .col 
                    span ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "КАФЕДРА ОНЛАЙН"
                .col 
                    span ИНН: 5190091813
                    span КПП: 519001001
                .col
                    span ОГРН: 1225100003468
                    span 183039, Мурманская область, г Мурманск, ул Новое Плато, д. 1, помещ. 1
</template>

<script>
export default {
    pageTransition: 'fade',
    data() {
        return {
            menuHide: false
        };
    },
    methods: {
        SetBgWhite() {
            let left = this.$refs.header.$el.querySelector(".side.white").getBoundingClientRect().left;
            console.log(left)
            let width = window.innerWidth;
            console.log(width)
            this.$refs.bgWhite.style.width = `${width - left - 20}px`;
        },
        HideMenu() {
            this.menuHide = !this.menuHide;
        }
    },
    watch: {
        '$store.getters.USER.id': function() {
            console.log(`listen user-notification.${this.$store.getters.USER.id}`)
            this.$echo.channel(`user-notification.${this.$store.getters.USER.id}`)
            .listen('ClientNotification', (e) => {
                console.log(e)
                this.$store.dispatch('LOAD_NOTIFICATIONS')
                this.$notify({title: e.title, text: e.text, type: 'info'})
            })
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.SetBgWhite);
    },
    mounted() {
        this.$store.dispatch("LOAD_PROFILE");
        this.$store.dispatch("LOAD_PROGRESS");
        this.$store.dispatch("LOAD_RECOMENDATIONS");
        this.$store.dispatch("LOAD_CALENDAR");
        this.$store.dispatch('admin/LOAD_TASKS');
        window.addEventListener("resize", this.SetBgWhite);
        this.SetBgWhite();

        if (this.$auth.user.email_verified_at == null)
        {
            this.$router.push('/register/verification');
        }
    },
}
</script>

<style lang="scss">
body
{
    background: #f1fafd;
}

</style>