<template lang="pug">
.score-wrapper 
    button.star(v-for="index in 10" :class="{active: index <= value || index <= hoverIndex}" @mouseover="HandlerHoverStar(index)" @mouseleave="HandlerHoverStar(0)" @click="HandlerStarClick(index)")
        img(src="/assets/images/icons/star.png")
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            hoverIndex: 0
        }
    },
    methods: {
        HandlerHoverStar(index)
        {
            this.hoverIndex = index
        },
        HandlerStarClick(index)
        {
            this.$emit('input', index)
        }
    }
}
</script>

<style>

</style>