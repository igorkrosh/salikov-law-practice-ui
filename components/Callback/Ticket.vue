<template lang="pug">
.card.ticket
    .text-wrapper
        .ticket-title {{ticket.title}}
        .ticket-data {{ticket.data}}
    .status.edit(v-if="ticket.status == 'new'") В работе
    .status.verified(v-if="ticket.status == 'done'") Закрыт
    .options-wrapper 
        NuxtLink(:to="`/callback/ticket/${ticket.id}`").btn.blue.sm Перейти
</template>

<script>
export default {
    props: ['ticket'],
    mounted() {
        this.ticket.data = new Date(this.ticket.data).toLocaleDateString("ru-RU")
    }
}
</script>

<style lang="scss">

</style>