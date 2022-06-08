<template lang="pug">
VueEditor(:editor-toolbar="toolbar" @input="OnInput" v-model="content")
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'align': [] }],
                ["code-block"],
            ],
            content: '',
        }
    },
    methods:
    {
        OnInput()
        {
            this.$emit('input', this.content)
        }
    },
    mounted()
    {
        this.content = this.value;
    }
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