<template lang="pug">
.card.callback.block(v-if="tickets.length == 0")
    h2 У вас пока нету чатов
    p Создайте чат с выбранными участниками, чтобы начать общение
    .btn-wrapper 
        NuxtLink.btn(to="/callback/add") Создать чат
.block(v-else)
    CallbackTicket(v-for="(item, index) in tickets" :ticket="item" :key="index")
</template>

<script>
export default {
    data() {
        return {
            tickets: []
        }
    },
    methods: {
        LoadTickets()
        {
            this.$axios.$get(`/api/ticket/get`)
            .then(response => {
                this.tickets = response
            })
        }
    },
    mounted()
    {
        this.LoadTickets();
    }
}
</script>

<style>

</style>