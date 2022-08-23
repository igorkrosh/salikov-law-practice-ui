<template lang="pug">
.filter-radio
    NuxtLink(to="/statistic").radio За период
        input(type="checkbox" :checked="this.$route.name == 'statistic'")
        span.checkmark
    NuxtLink(to="/statistic/promocodes").radio Промокоды
        input(type="checkbox" :checked="this.$route.name == 'statistic-promocodes'")
        span.checkmark
    NuxtLink(to="/statistic/referral").radio Источники
        input(type="checkbox" :checked="this.$route.name == 'statistic-referral'")
        span.checkmark
    NuxtLink(to="/statistic/courses").radio Курсы
        input(type="checkbox" :checked="this.$route.name == 'statistic-courses'")
        span.checkmark
</template>

<script>
export default {
    mounted() {
        console.log(this.$route)
    }
}
</script>

<style>

</style>