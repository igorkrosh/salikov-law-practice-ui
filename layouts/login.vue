<template lang="pug">
section.lk 
    .header(ref="header")
        .container 
            .content
                .side 
                    .navbar
                        .col.first
                            NuxtLink(to="/" class="logo")
                                img(src="~assets/images/logo.png", alt="")
                        .col.second
                            h1 {{this.$store.getters.PAGETITLE}}
                .side.white
    .page.login-page
        .container
            .center
                Nuxt
    NotificationsSystem
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