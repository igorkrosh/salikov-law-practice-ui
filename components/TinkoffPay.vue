<template>
<div class="root">
    <button class="btn" @click="TinkoffPay"></button>
</div>
</template>

<script>
export default {
    methods: {
        TinkoffPay()
        {
            let tinkoff = this.$axios.post('/api/course/pay')
        }
    }
}
</script>

<style>
.tinkoffPayRow{display:block;margin:1%;width:160px;}
</style>