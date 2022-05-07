<template lang="pug">
    .item 
        .icon(:class="item.type") 
        .desc 
            .item-title {{item.title}}
            .wrapper
                .date {{item.date}}
                .name Спикеры: {{item.lectors}}
                .tag(:class="item.type") {{item.webinarType}}
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>