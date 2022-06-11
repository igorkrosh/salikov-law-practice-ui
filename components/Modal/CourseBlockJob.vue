<template lang="pug">
Modal(:name="ModalName" height="auto" width="800" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="CloseModal")
        h3 Добавить задание
        .input-wrapper(:class="{error: errors.includes('authors')}")
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper(:class="{error: errors.includes('title')}")
            label Название урока:
            .input
                input(v-model="module.title")
        .input-wrapper(:class="{error: errors.includes('text')}")
            label Задание: 
            TextEditor(v-model="module.text")
        .date-row
            .wrapper
                DatePicker(label="Срок выполнения" v-model="module.deadline")
                DatePicker(label="Срок проверки" v-model="module.check_date")
            button.file 
                |Прикрепить файл 
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
            return `course-block-job-${this.blockId}`;
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

            if (this.module.text == '')
            {
                this.errors.push('text')
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

            if (this.errors.includes('authors') && this.errors.includes('title') && this.errors.includes('text'))
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

<style lang="scss">

</style>