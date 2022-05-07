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
                            h1 Мое обучение 
                            HeaderSearchBlock
                .side 
                    HeaderUserInfo
</template>

<script>
export default {

}
</script>

<style>

</style>