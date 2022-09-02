<template lang="pug">
.col-wrapper
    .col.first 
        .progress-wrapper.block(v-if="this.$store.getters.PROGRESS.length > 0")
            h2 Прогресс:
            ProfileProgressItem(v-for="(item, index) in this.$store.getters.PROGRESS" :key="index" :item="item" :link="`/user/course/${item.id}`")
        .webinar.block(v-if="this.$store.getters.WEBINAR.length > 0")
            h2 Предстоящие вебинары:
            .webinar-wrapper
                ProfileWebinarItem(v-for="(item, index) in this.$store.getters.WEBINAR" :key="index" :item="item")
        .results.block(v-if="this.$store.getters.RESULTS.length > 0")
            h2 Результаты:
            .results-wrapper
                ProfileResultItem(v-for="(item, index) in this.$store.getters.RESULTS" :key="index" :item="item")
        .recomendation.block(v-if="this.$store.getters.RECOMENDATIONS.length > 0")
            h2 Рекомендации:
            .wrapper
                RecomendationCard(v-for="(item, index) in this.$store.getters.RECOMENDATIONS" :key="index" :item="item")
    .col.second
        ProfileColumnInfo
        //.recomendation.block(v-if="this.$store.getters.RECOMENDATIONS.length > 0")
            h2 Рекомендации:
            .wrapper
                CourseCard(v-for="(item, index) in this.$store.getters.RECOMENDATIONS" :key="index" :item="item" :link="item.link")

</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Моё обучение')
        this.$store.dispatch("LOAD_PROGRESS");
    }
}
</script>

<style>

</style>