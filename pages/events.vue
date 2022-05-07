<template lang="pug">
    .col-wrapper 
        .col.first 
            h2 About.vue
        .col.second 
            .journal.block(v-if="this.$store.getters.JOURNAL.length > 0")
                h2 Задания:
                .item-wrapper
                    ProfileJournalItem(v-for="(item, index) in this.$store.getters.JOURNAL" :key="index" :item="item")
</template>

<script>
export default {

}
</script>

<style>

</style>