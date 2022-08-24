<template lang="pug">
NuxtLink(:to="EditLink").item 
    .img 
        img(:src="item.image", alt="")
    .desc 
        .item-title {{item.title}}
        .name {{item.lectors}}
        .wrapper 
            span.tag {{item.type}}
            span.status(:class="item.status") 
                span(v-if="item.status == 'edit'") Необходима проверка
                span(v-if="item.status == 'check'") На проверке
                span(v-if="item.status == 'verified'") Проверен
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