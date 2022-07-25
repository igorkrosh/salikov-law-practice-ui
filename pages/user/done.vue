<template lang="pug">
.col-wrapper.page-edit
    .col.first
        .progress-wrapper.block(v-if="this.$store.getters.DONE.length > 0")
            ProfileProgressItem(v-for="(item, index) in this.$store.getters.DONE" :key="index" :item="item" :link="`/user/course/${item.id}`")
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Пройденые курсы')
    }
}
</script>

<style>

</style>