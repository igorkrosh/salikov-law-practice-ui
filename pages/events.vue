<template lang="pug">
.col-wrapper 
    .col.first.page-events
        CalendarBlock
    ProfileColumnInfo(:calendar="false")
</template>

<script>
export default {
    middleware: "auth",
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'События')
    }
}
</script>

<style lang="scss">

</style>