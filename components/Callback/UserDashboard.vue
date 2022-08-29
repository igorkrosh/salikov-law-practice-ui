<template lang="pug">
.root
    .card.callback.block(v-if="tickets.length == 0")
        h2 У вас пока нету чатов
        p Создайте чат с выбранными участниками, чтобы начать общение
        .btn-wrapper 
            NuxtLink.btn(to="/callback/add") Создать чат
    .block.ticket-list(v-else)
        CallbackTicket(v-for="(item, index) in tickets" :ticket="item" :key="index")
        .btn-wrapper 
            NuxtLink.btn(to="/callback/add") Создать чат
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

<style lang="scss">
.ticket-list
{
    .btn-wrapper 
    {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 25px;
    }
}
</style>