<template lang="pug">
.input-file
    label.file(:for="name") Прикрепить файл 
    span.filename(v-if="file") {{file.name}}
    input(type="file" :id="name" :ref="name" v-on:change="HandleFileUpload()" hidden)
</template>

<script>
export default {
    props: ['name', 'value'],
    data() {
        return {
            file: null,
        }
    },
    methods: {
        HandleFileUpload()
        {
            this.file = this.$refs[`${this.name}`].files[0]
            this.$emit('input', this.file);
        }
    },
    watch: {
        value()
        {
            this.file = this.value
        }
    },
    mounted() {
        this.file = this.value
    }
}
</script>

<style lang="scss">
.input-file
{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .filename 
    {
        font-size: 14px;
        margin-top: 5px;
    }
}
</style>