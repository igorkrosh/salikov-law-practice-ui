<template lang="pug">
.module-files-wrapper
    .wrapper(v-if="value.files.length > 0")
        h4 Прикрепленные файлы
        .item(v-for="(item, index) in value.files" :key="index" :class="{deleted: value.deleted_files.includes(item.id)}")
            span.filename {{item.filename}}
            a(:href="item.url" target="_blank").link Скачать
            span.delete(@click="DeleteFile(item.id)" v-if="!value.deleted_files.includes(item.id)") Удалить
            span.delete(@click="CancelDeleteFile(item.id)" v-else) Отмена
    .wrapper(v-if="value.new_files.length > 0")
        h4 Новые файлы
        .item(v-for="(item, index) in value.new_files" :key="item.file.name")
            span.filename {{item.file.name}}
            span.delete(@click="CancelDownloadNewFile(item)") Удалить
    InputFile(:name="`job-file-1-1`" v-model="fileInput" @input="HandlerFileInput")
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            fileInput: null,
        }
    },
    methods: {
        DeleteFile(id) {
            this.value.deleted_files.push(id)

            this.$emit('input', this.value)
        },
        CancelDeleteFile(id)
        {
            let index = this.value.deleted_files.indexOf(id)

            if (index > -1) 
            { 
                this.value.deleted_files.splice(index, 1)
            }

            this.$emit('input', this.value)
        },
        CancelDownloadNewFile(file)
        {
            let index = this.value.new_files.indexOf(file)

            if (index > -1) 
            { 
                this.value.new_files.splice(index, 1)
            }

            this.$emit('input', this.value)
        },
        HandlerFileInput(file)
        {
            if (file)
            {
                this.value.new_files.push({
                    id: `${file.name.replace(".", "_").replace(" ", "_")}`,
                    file: file
                })
                this.fileInput = null
            }

            this.$emit('input', this.value)
            
        }
    },
    mounted()
    {
        this.deletedFiles = this.value.deleted_files;
        this.newFiles = this.value.new_files;
    }
}
</script>

<style>

</style>