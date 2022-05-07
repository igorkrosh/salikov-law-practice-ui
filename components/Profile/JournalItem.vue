<template lang="pug">
    .item
        .row
            img(src="~/assets/images/icons/achievements/1.png", alt="").icon
            .wrapper 
                .item-title {{item.title}}
                .text {{item.text}}
        .date Срок сдачи: {{item.date}}
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>