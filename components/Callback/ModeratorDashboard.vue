<template lang="pug">
.card.callback.block(v-if="tickets.length == 0")
    h2 У вас пока нету чатов
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
            this.$axios.$get(`/api/ticket/all`)
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