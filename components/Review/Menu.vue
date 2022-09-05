<template lang="pug">
.page-statistic
    .filter-radio
        NuxtLink(to="/reviews").radio Курсы
            input(type="checkbox" :checked="this.$route.name == 'reviews'")
            span.checkmark
        NuxtLink(to="/reviews/webinars").radio Промокоды
            input(type="checkbox" :checked="this.$route.name == 'reviews-webinars'")
            span.checkmark
        NuxtLink(to="/reviews/modules").radio Материалы
            input(type="checkbox" :checked="this.$route.name == 'reviews-modules'")
            span.checkmark
</template>

<script>
export default {

}
</script>

<style>

</style>