<template lang="pug">
NuxtLink(:to="Link").item
    .row
        img(src="~/assets/images/icons/achievements/1.png", alt="").icon
        .wrapper 
            .item-title {{item.course}}
            .text {{item.module}}
    .date Срок сдачи: {{item.date}}
</template>

<script>
export default {
    props: ['item', 'type'],
    computed: {
        Link()
        {
            if (this.type == 'admin')
            {
                return `/educator/homework?taskid=${this.item.task_id}`
            }
            if (this.type != 'admin')
            {
                return `/user/course/${this.item.course_id}/job/${this.item.task_id}`
            }

            return '';
        }
    }
}
</script>

<style>

</style>