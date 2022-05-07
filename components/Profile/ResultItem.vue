<template lang="pug">
    .item 
        .icon(:class="item.type")
        .desc 
            .item-title {{item.title}}
            .wrapper 
                .name {{item.lectors}} 
                .date {{item.date}}
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>