<template lang="pug">
    section.lk 
        Header(ref="header")
        .page
            .container 
                .content
                    Menu
                    Nuxt
            .bg-white(ref="bgWhite")
</template>

<script>
export default {
    methods: {
        SetBgWhite() {
            let left = this.$refs.header.$el.querySelector('.side.white').getBoundingClientRect().left;
            let width = window.innerWidth;

            this.$refs.bgWhite.style.width = `${width - left - 15}px`
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.SetBgWhite);
    },
    mounted() {
        this.$store.dispatch('LOAD_PROFILE')
        this.$store.dispatch('LOAD_RECOMENDATIONS')

        window.addEventListener("resize", this.SetBgWhite);
        this.SetBgWhite();
    }
}
</script>

<style>

</style>