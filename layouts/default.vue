<template lang="pug">
section.lk 
    Header(ref="header")
    .page
        .container 
            .content(:class="{'hide-menu':menuHide}")
                Menu(@menu-hide="HideMenu")
                Nuxt
        .bg-white(ref="bgWhite" :class="{hide: this.$store.getters.DISABLE_BG_WHITE}")
    NotificationsSystem
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
    destroyed() {
        window.removeEventListener("resize", this.SetBgWhite);
    },
    mounted() {
        this.$store.dispatch("LOAD_PROFILE");
        this.$store.dispatch("LOAD_RECOMENDATIONS");
        this.$store.dispatch("LOAD_CALENDAR");
        this.$store.dispatch('admin/LOAD_TASKS');
        window.addEventListener("resize", this.SetBgWhite);
        this.SetBgWhite();
    },
}
</script>

<style>

</style>