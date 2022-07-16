<template lang="pug">
.item 
    .icon(:class="item.type") 
    .desc 
        .item-title {{item.title}}
        .wrapper
            .date {{item.date}}
            .name Спикеры: {{item.lectors}}
            .tag(:class="item.type")
                span(v-if="item.type == 'stream'") Стрим в рамках курса 
                span(v-if="item.type == 'webinar'") Вебинар
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>