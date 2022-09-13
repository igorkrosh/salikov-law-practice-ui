<template lang="pug">
NuxtLink(:to="Link").item 
    .icon(:class="item.type") 
    .desc 
        .item-title {{item.title}}
        .wrapper
            .date {{item.date}}
            .name Спикеры: {{item.lectors}}
            .tag-wrapper
                .tag(:class="item.type")
                    span(v-if="item.type == 'stream'") Стрим в рамках курса 
                    span(v-if="item.type == 'webinar'") Вебинар
                .tag(:class="item.status" v-if="item.status == 'done'")
                    span Запись
</template>

<script>
export default {
    props: ['item'],
    computed: {
        Link()
        {
            if (this.$store.getters.USER.role != 'user')
            {
                switch (this.item.type) 
                {
                    case 'stream':
                        return `/educator/course/${this.item.course_id}/stream/${this.item.id}`
                    case 'webinar':
                        return `/webinars/stream/${this.item.id}`
                    default:
                        return '#'
                }
            }
            else 
            {
                switch (this.item.type) 
                {
                    case 'stream':
                        return `/user/course/${this.item.course_id}/stream/${this.item.id}`
                    case 'webinar':
                        return `/webinars/stream/${this.item.id}`
                    default:
                        return '#'
                }
            }
            
        }
    }
}
</script>

<style>

</style>