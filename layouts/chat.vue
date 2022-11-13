<template lang="pug">
section.lk 
    .header(ref="header")
        .container 
            .content
                .side 
                    .navbar
                        .col.first
                            a(href="/" class="logo")
                                img(src="~assets/images/logo.svg", alt="")
                        .col.second
                            h1 {{this.$store.getters.PAGETITLE}}
                .side.white
    .page.chat
        .container
            Nuxt
</template>

<script>
export default {
    pageTransition: 'fade'
}
</script>

<style lang="scss">
.login-page 
{
    .card 
    {
        width: 600px;

        .wrapper
        {
            width: 100%;
            flex-direction: column;

            .input-wrapper 
            {
                width: 100%;
            }
        }
    }
}

</style>