<template lang="pug">
.text.center
    h2 Покупка прошла успешно
</template>

<script>
export default {
    layout: 'payment',
    data() {
        return {
            userId: null,
        }
    },
    mounted()
    {
        this.userId = this.$route.params.id;

        this.$axios.$post(`/api/buy/order/${userId}/success`, {})

        window.top.postMessage('payment_success', '*')

    }
}
</script>

<style>

</style>