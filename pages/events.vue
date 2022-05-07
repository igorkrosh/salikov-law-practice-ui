<template lang="pug">
    .col-wrapper 
        .col.first.page-events
            CalendarBlock
        .col.second 
            .journal.block(v-if="this.$store.getters.JOURNAL.length > 0")
                h2 Задания:
                .item-wrapper
                    ProfileJournalItem(v-for="(item, index) in this.$store.getters.JOURNAL" :key="index" :item="item")
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'События')
    }
}
</script>

<style lang="scss">
.page-events .calendar.block 
{
    .vc-container 
    {
        background: none;
    }

    .vc-title
    {
        font-size: 30px;
    }

    .vc-weekday, .vc-day-content
    {
        font-size: 20px;
    }

    .vc-weeks 
    {
        grid-column-gap: 56px;
    }
    
} 
@media(max-width: 540px)
{
    .page-events .calendar.block .vc-weekday, .page-events .calendar.block .vc-day-content
    {
        font-size: 14px;
    }

    section.lk .page-events .calendar.block .vc-weeks
    {
        grid-column-gap: 1px;
    }
}

</style>