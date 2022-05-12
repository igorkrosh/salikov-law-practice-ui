<template lang="pug">
    .col-wrapper.page-edit
        .col.first
            .card.callback.block
                h2 У вас пока нету чатов
                p Создайте чат с выбранными участниками, чтобы начать общение
                .btn-wrapper 
                    button.btn Создать чат
        ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Обратная связь')
    }
}
</script>

<style>
.callback.block 
{
    justify-content: center;
}
</style>