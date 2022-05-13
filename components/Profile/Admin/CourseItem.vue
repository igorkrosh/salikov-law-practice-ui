<template lang="pug">
    a(href="").item 
        .img 
            img(:src="item.image", alt="")
        .desc 
            .item-title {{item.title}}
            .name {{item.lectors}}
            .wrapper 
                span.tag {{item.type}}
</template>

<script>
export default {
    props: ['item'],
}
</script>

<style>

</style>