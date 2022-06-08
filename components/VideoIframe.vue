<template lang="pug">
.iframe-wrapper 
    iframe(
        :src="link"
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
        allowfullscreen
    )
</template>

<script>
export default {
    props: ['link']
}
</script>

<style>
.iframe-wrapper 
{
    width: 500px;
    height: 300px;
}
</style>