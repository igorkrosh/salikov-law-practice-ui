<template lang="pug">
.card.ticket
    .text-wrapper
        .ticket-title {{ticket.title}}
        .ticket-data {{ticket.data}}
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
.card.ticket
{
    display: flex;
    align-items: center;
    padding: 15px 25px;

    .ticket-title
    {
        font-weight: 700;
        font-size: 14px;
    }

    .ticket-data
    {
        font-size: 13px;
        color: #aaaaaa;
    }
    
}
</style>