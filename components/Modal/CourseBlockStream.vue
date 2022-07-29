<template lang="pug">
Modal(:name="ModalName" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="CloseModal")
        h3 Добавить стрим-ссылку
        .input-wrapper(:class="{error: errors.includes('authors')}")
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper(:class="{error: errors.includes('title')}")
            label Название урока:
            .input
                input(v-model="module.title")
        .input-wrapper(:class="{error: errors.includes('link')}")
            label Стрим-ссылка:
            .input
                input(placeholder="https://www.ya.ru" v-model="module.link")
        CourseFileEditor(v-model="module" :blockId="blockId")
        .date-row 
            .wrapper
                DatePicker(label="Дата проведения" v-model="module.date")
        .center 
            button.btn(@click="SaveModule") Подтвердить

</template>

<script>
export default {
    props: ['blockId', 'value'],
    data() {
        return {
            module: this.value,
            errors: []
        }
    },
    computed: {
        ModalName() {
            return `course-block-stream-${this.blockId}`;
        }
    },
    methods: {
        SaveModule()
        {
            if (this.CheckForm())
            {
                this.$emit('input', this.module);
                this.$emit('modal-close', this.ModalName);
            }
            else 
            {
                this.$notify({title: 'Ошибка добавления модуля', text: 'Проверте правильность заполнения полей', type: 'error'})
            }
        },
        CheckForm()
        {
            this.errors = [];

            if (this.module.authors == '')
            {
                this.errors.push('authors')
            }

            if (this.module.title == '')
            {
                this.errors.push('title')
            }

            if (this.module.link == '')
            {
                this.errors.push('link')
            }

            if (this.errors.length > 0)
            {                
                return false;
            }
            
            return true;
        },
        CloseModal()
        {
            this.module = Object.assign({}, this.value);
            this.CheckForm()

            if (this.errors.includes('authors') && this.errors.includes('title') && this.errors.includes('link'))
            {
                this.$emit('drop-module', this.module.index);
            }

            this.$emit('modal-close', this.ModalName)
        }
    },
    watch: {
        value() 
        {
            this.module = Object.assign({}, this.value);
            this.errors = [];
        }
    }
}
</script>

<style>

</style>