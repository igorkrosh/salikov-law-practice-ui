<template lang="pug">
    NuxtLink(:to="link").item 
        .img 
            img(:src="item.image", alt="")
        .desc 
            .item-title {{item.title}}
            .name {{item.lectors}}
            .wrapper 
                span.tag {{item.type}}
                .progress 
                    span {{item.progress}}%
                    .bg(:style="{width: item.progress + '%'}")
</template>

<script>
export default {
    props: ['item', 'link'],
}
</script>

<style>

</style>