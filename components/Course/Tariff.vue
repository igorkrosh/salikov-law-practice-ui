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
.tariff-item.active 
{
    border: 2px solid #354c55;
}
.tariff-item 
{
    width: 270px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 15%);
    cursor: pointer;
    border: 2px solid #efefef;
    transition: 0.3s;
    display: flex;
    flex-direction: column;

    .name 
    {
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: #354c55;
        height: 100%;

        b 
        {
            font-size: 22px;
            margin-bottom: 10px;
        }

        span 
        {
            font-size: 15px;
        }

        .price-wrapper
        {
            margin-top: 35px;
            color: #000;

            .old-price
            {
                font-size: 15px;
                text-decoration: line-through;
            }

            .price 
            {
                font-size: 25px;
                font-weight: 700;
            }
        }
    }

    .desc 
    {
        padding: 15px;
        font-size: 13px;
        background: #fff;

        .row 
        {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #dedede;
        }

        .row:last-child
        {
            border-bottom: none;
        }

        span 
        {
            width: 50%;
        }

        b 
        {
            width: 50%;
        }
    }
}

.tariff-item:nth-child(1) .name
{
    background: #ebfcfb;
}

.tariff-item:nth-child(2) .name
{
    background: #f1f4fc;
}

.tariff-item:nth-child(3) .name
{
    background: #d0e8ff;
}

.tariff-item:nth-child(4) .name
{
    background: #f4efd2;
}
</style>