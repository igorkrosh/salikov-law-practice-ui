<template lang="pug">
.col.second
    CalendarBlock(v-if="calendar")
    .journal.block(v-if="this.$store.getters.JOURNAL.length > 0 && this.$store.getters.USER.role == 'user'")
        .title-wrapper 
            h2 Задания:
            NuxtLink(v-if="this.$store.getters.USER.role != 'user'" to="/educator/homework").btn.blue.sm Задания учеников
        .item-wrapper
            ProfileJournalItem(v-for="(item, index) in this.$store.getters.JOURNAL" :key="index" :item="item")
            //button.btn(v-if="this.$store.getters.USER.role != 'user'") Добавить
    .journal.block(v-if="this.$store.getters['admin/TASKS'].length > 0 && (this.$store.getters.USER.role == 'admin' || this.$store.getters.USER.role == 'educator')")
        .title-wrapper 
            h2 Задания:
            NuxtLink(to="/educator/homework").btn.blue.sm Задания учеников
        .item-wrapper
            ProfileJournalItem(v-for="(item, index) in this.$store.getters['admin/TASKS']" :key="index" :item="item" type="admin" v-if="!item.score")
    //.achievements.block(v-if="this.$store.getters.USER.role == 'user'")
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