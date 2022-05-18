<template lang="pug">
.col.second
    CalendarBlock(v-if="calendar")
    .journal.block(v-if="this.$store.getters.JOURNAL.length > 0")
        h2 Задания:
        .item-wrapper
            ProfileJournalItem(v-for="(item, index) in this.$store.getters.JOURNAL" :key="index" :item="item")
            button.btn(v-if="this.$store.getters.USER.role != 'user'") Добавить
    .achievements.block(v-if="this.$store.getters.USER.role == 'user'")
        h2 Достижения:
        .item-wrapper 
            ProfileAchievementsItem(v-for="(item, index) in this.$store.getters.ACHIEVEMENTS" :key="index" :item="item")
</template>

<script>
export default {
    props: {
        calendar: {
            default: true,
            type: Boolean
        }
    }
}
</script>

<style>

</style>