<template lang="pug">
    VueEditor(:editor-toolbar="toolbar")
</template>

<script>
export default {
    data() {
        return {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'align': [] }],
                ["code-block"],
            ]
        }
    },
}
</script>

<style>
.quillWrapper .ql-container
{
    height: auto;
    font-family: 'OpenSans';
}

.quillWrapper .ql-snow.ql-toolbar
{
    background: #ededed;
}
</style>