<template lang="pug">
.module-files-wrapper
    .wrapper(v-if="value.files.length > 0")
        h4 Прикрепленные файлы
        .item(v-for="(item, index) in value.files" :key="index" :class="{deleted: deletedFiles.includes(item.id)}")
            span.filename {{item.filename}}
            a(:href="item.url" target="_blank").link Скачать
            span.delete(@click="DeleteFile(item.id)" v-if="!deletedFiles.includes(item.id)") Удалить
            span.delete(@click="CancelDeleteFile(item.id)" v-else) Отмена
    .wrapper(v-if="newFiles.length > 0")
        h4 Новые файлы
        .item(v-for="(item, index) in newFiles" :key="item.file.name")
            span.filename {{item.file.name}}
            span.delete(@click="CancelDownloadNewFile(item)") Удалить
    InputFile(:name="`job-file-1-1`" v-model="fileInput" @input="HandlerFileInput")
</template>

<script>
export default {
    props: ['value', 'blockId'],
    data() {
        return {
            deletedFiles: [],
            fileInput: null,
            newFiles: []
        }
    },
    methods: {
        DeleteFile(id) {
            this.deletedFiles.push(id)

            this.$emit('change-files', this.newFiles, this.deletedFiles)
        },
        CancelDeleteFile(id)
        {
            let index = this.deletedFiles.indexOf(id)

            if (index > -1) 
            { 
                this.deletedFiles.splice(index, 1)
            }

            this.$emit('change-files', this.newFiles, this.deletedFiles)
        },
        CancelDownloadNewFile(file)
        {
            let index = this.newFiles.indexOf(file)

            if (index > -1) 
            { 
                this.newFiles.splice(index, 1)
            }

            this.$emit('change-files', this.newFiles, this.deletedFiles)
        },
        HandlerFileInput(file)
        {
            if (file)
            {
                this.newFiles.push({
                    id: `${this.blockId}_${this.value.index}_${file.name.replace(".", "_").replace(" ", "_")}`,
                    file: file
                })
                this.fileInput = null
            }
            

            this.$emit('change-files', this.newFiles, this.deletedFiles)
        }
    },
    mounted()
    {
        this.deletedFiles = this.value.deleted_files;
        this.newFiles = this.value.new_files;
    }
}
</script>

<style lang="scss">
.module-files-wrapper
{
    width: 100%;
    padding: 15px;
    border: 1px solid #ededed;
    border-radius: 10px;
    margin-bottom: 20px;

    .item.deleted 
    {
        .filename
        {
            color: #a90808;
            text-decoration: line-through;
        }
    }

    .wrapper 
    {
        flex-direction: column;
    }

    .item 
    {
        font-size: 14px;
        margin-bottom: 5px;

        span 
        {
            margin-right: 10px;
            display: inline-block;
            word-break: break-all;
        }

        .link 
        {
            margin-right: 10px;
        }

        .delete
        {
            color: #a90808;
            cursor: pointer;
        }
    }

    h4
    {
        margin-top: 0;
    }

    .wrapper 
    {
        margin-bottom: 20px;
    }
}
</style>