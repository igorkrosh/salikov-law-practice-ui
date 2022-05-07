<template lang="pug">
    section.lk 
        Header
        .page
            .container 
                .content
                    Menu
                    Nuxt
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('LOAD_PROFILE')
        this.$store.dispatch('LOAD_RECOMENDATIONS')
    }
}
</script>

<style>

</style>