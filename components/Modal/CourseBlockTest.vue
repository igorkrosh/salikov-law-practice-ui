<template lang="pug">
Modal(:name="ModalName" :maxHeight="350" height="auto" width="800"  classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block(v-if="module")
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить тест
        .input-wrapper 
            label Автор:
            input(placeholder="Иванов И.И." v-model="module.authors")
        .input-wrapper 
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
    computed: {
        ModalName() {
            return `course-block-test-${this.blockId}`;
        }
    },
    data() 
    {
        return {
            module: this.value
        }
    },
    methods: {
        AddAnswer(index) 
        {
            this.module.test[index].answer.push({
                text: '',
                corrent: false
            })
        },
        AddQuestion()
        {
            this.module.test.push({
                question: '',
                answer: [
                    {
                        text: '',
                        corrent: false
                    }
                ]
            })
        },
        SaveModule()
        {
            this.$emit('input', this.module);
            this.$emit('modal-close', this.ModalName);
        },
    },
    watch: {
        value() 
        {
            this.module = Object.assign({}, this.value);
        }
    }
}
</script>

<style lang="scss">

</style>