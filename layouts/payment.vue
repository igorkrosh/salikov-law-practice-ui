<template lang="pug">
section.lk.page-payment
    .header(ref="header")
        .container 
            .content
                .side 
                    .navbar
                        .col.first
                            a(href="/" class="logo")
                                img(src="~assets/images/logo.png", alt="")
                        .col.second
                .side.white
    .page.payment
        .container
            Nuxt
</template>

<script>
export default {
    pageTransition: 'fade'
}
</script>

<style lang="scss">
section.lk.page-payment 
{
    display: flex;
    flex-direction: column;

    .page.payment
    {
        margin: auto;
    }
}
</style>