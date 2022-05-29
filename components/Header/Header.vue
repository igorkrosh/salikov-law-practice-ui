<template lang="pug">
.header 
    .container 
        .content
            .side 
                .navbar
                    .col.first
                        a(href="/" class="logo")
                            img(src="~assets/images/logo.png", alt="")
                    .col.second
                        h1 {{this.$store.getters.PAGETITLE}}
                        HeaderSearchBlock
            .side.white
                HeaderUserInfo
</template>

<script>
export default {

}
</script>

<style>

</style>