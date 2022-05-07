<template lang="pug">
    .item 
        img(:src="item.image", alt="").icon
        .wrapper 
            .item-title {{item.title}}
            .text {{item.text}}
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>

</style>