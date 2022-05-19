<template lang="pug">
    .col-wrapper.page-edit
        .col.first
            .progress-wrapper.block(v-if="this.$store.getters.PROGRESS.length > 0")
                ProfileProgressItem(v-for="(item, index) in this.$store.getters.DONE" :key="index" :item="item" link="/courses/detail")
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Пройденые курсы')
    }
}
</script>

<style>

</style>