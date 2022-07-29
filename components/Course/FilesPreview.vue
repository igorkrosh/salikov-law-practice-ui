<template lang="pug">
.module-files-wrapper.list(v-if="files.length > 0")
    .wrapper(v-for="(item, index) in files" :key="index")
        h4 {{item.filename}}
        .preview
            img(:src="item.url")
    
</template>

<script>
export default {
    props: ['files']
}
</script>

<style>
.module-files-wrapper .preview img 
{
    max-width: 100%;
}
</style>