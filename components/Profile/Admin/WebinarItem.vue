<template lang="pug">
NuxtLink(:to="EditLink").item 
    .img 
        img(:src="item.image", alt="")
    .desc 
        .item-title {{item.title}}
        .name {{item.lectors}}
        .wrapper 
            span.tag.webinar {{item.type}}
</template>

<script>
export default {
    props: ['item'],
    computed: {
        EditLink()
        {
            return `/webinars/edit/${this.item.id}`
        }
    }
}
</script>

<style>

</style>