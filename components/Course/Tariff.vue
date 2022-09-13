<template lang="pug">
.tariff-item(:class="{active: active}" @click="$emit('select-tariff', index)")
    .name 
        b {{tariff.title}}
        span {{tariff.subtitle}}
        .price-wrapper 
            .old-price(v-if="tariff.old_price") {{tariff.old_price}} руб.
            .price {{tariff.price}} руб.
    .desc
        .row-wrapper
            .row(v-for="(item, index) in tariff.options" :key="index")
                span {{item.option}}
                b {{item.value}}
</template>

<script>
export default {
    props: ['tariff', 'active', 'index']
}
</script>

<style lang="scss">

</style>