<template lang="pug">
    a(href="").item 
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
    props: ['item'],
}
</script>

<style>

</style>