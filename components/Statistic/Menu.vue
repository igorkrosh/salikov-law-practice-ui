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
    NuxtLink(to="/statistic/students" v-if="$store.getters.USER.role != 'author'").radio Статус обучения
        input(type="checkbox" :checked="this.$route.name == 'statistic-students'")
        span.checkmark
    NuxtLink(to="/statistic/files" v-if="$store.getters.USER.role != 'author'").radio Файлы
        input(type="checkbox" :checked="this.$route.name == 'statistic-files'")
        span.checkmark
    NuxtLink(to="/statistic/orders" v-if="$store.getters.USER.role != 'author'").radio Заказы
        input(type="checkbox" :checked="this.$route.name == 'statistic-orders'")
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