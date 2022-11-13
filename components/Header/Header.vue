<template lang="pug">
.header 
    .container 
        .content
            .side 
                .navbar
                    .col.first
                        NuxtLink(to="/" class="logo")
                            img(src="~assets/images/logo.svg", alt="")
                    .col.second
                        h1 {{this.$store.getters.PAGETITLE}}
                        //HeaderSearchBlock
            .side.white
                HeaderUserInfo
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>