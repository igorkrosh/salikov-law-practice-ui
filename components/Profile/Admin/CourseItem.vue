<template lang="pug">
NuxtLink(:to="EditLink").item 
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
    computed: {
        EditLink()
        {
            return `/courses/edit/${this.item.id}`
        }
    }
}
</script>

<style>

</style>