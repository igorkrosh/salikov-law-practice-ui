<template lang="pug">
Modal(:name="ModalName" :maxHeight="350" height="auto" width="800"  classes="dialog" :adaptive="true" :scrollable="true" :clickToClose="false")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="CloseModal")
        h3 Добавить тест
        .input-wrapper(:class="{error: errors.includes('authors')}")
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper(:class="{error: errors.includes('title')}")
            label Название урока:
            .input
                input(v-model="module.title")
        .question(v-for="(item, index) in module.test")
            .input-wrapper
                label Вопрос №{{index+1}}
                input(v-model="item.question")
            .answer-wrapper 
                .answer(v-for="(itm, index) in item.answer")
                    .input-wrapper 
                        label.answer-title Ответ на вопрос №{{index+1}}
                        input.text(v-model="itm.text")
                        label.radio
                            input(type="checkbox" v-model="itm.correct")
                            span.checkmark
                    .input-wrapper(v-if="itm.correct")
                        label Коментарий преподавателя:
                        input(v-model="itm.comment")
            .btn-wrapper
                button.btn.blue.add-question(@click="AddQuestion" v-if="index + 1 == module.test.length") Добавить вопрос
                button.btn.blue(@click="AddAnswer(index)") Добавить ответ
        CourseFileEditor(v-model="module" :blockId="blockId")
        .date-row
            .wrapper
                DatePicker(label="Срок выполнения" v-model="module.deadline")
                DatePicker(label="Срок проверки" v-model="module.check_date")
        .center 
            button.btn(@click="SaveModule") Подтвердить
                    
</template>

<script>
export default {
    props: ['blockId', 'value'],
    computed: {
        ModalName() {
            return `course-block-test-${this.blockId}`;
        }
    },
    data() 
    {
        return {
            module: this.value,
            errors: []
        }
    },
    methods: {
        AddAnswer(index) 
        {
            this.module.test[index].answer.push({
                text: '',
                correct: false
            })
        },
        AddQuestion()
        {
            this.module.test.push({
                question: '',
                answer: [
                    {
                        text: '',
                        correct: false
                    }
                ]
            })
        },
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

            if (this.errors.includes('authors') && this.errors.includes('title'))
            {
                this.$emit('drop-module', this.module.index);
            }

            this.$emit('modal-close', this.ModalName)
        },
        FileInput(file)
        {
            this.module.fileId = `test-file-${this.blockId}-${this.module.index}`
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