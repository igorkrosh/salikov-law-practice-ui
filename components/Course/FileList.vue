<template lang="pug">
.module-files-wrapper.list(v-if="files.length > 0")
    h4 Прикрепленные файлы
    .item(v-for="(item, index) in files" :key="index")
        span.filename {{item.filename}}
        a(:href="item.url" target="_blank").link Скачать

</template>

<script>
export default {
    props: ['files']
}
</script>

<style>
.module-files-wrapper.list
{
    margin-top: 10px;
    margin-bottom: 0;
}
</style>