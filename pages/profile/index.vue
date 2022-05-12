<template lang="pug">
    .col-wrapper 
        .col.first
            
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Профиль')
    }
}
</script>

<style>

</style>