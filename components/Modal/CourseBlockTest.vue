<template lang="pug">
Modal(:name="ModalName" :maxHeight="350" height="auto" width="800"  classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$emit('modal-close', ModalName)")
        h3 Добавить тест
        .question(v-for="(item, index) in test")
            .input-wrapper 
                label Вопрос №{{index+1}}
                input
            .answer-wrapper 
                .answer(v-for="(itm, index) in item.answer")
                    .input-wrapper 
                        label.answer-title Ответ на вопрос №{{index+1}}
                        input.text(:value="itm.text")
                        label.radio
                            input(type="checkbox" v-model="itm.correct")
                            span.checkmark
                    .input-wrapper(v-if="itm.correct")
                        label Коментарий преподавателя:
                        input
            .btn-wrapper
                button.btn.blue.add-question(@click="AddQuestion" v-if="index + 1 == test.length") Добавить вопрос
                button.btn.blue(@click="AddAnswer(index)") Добавить ответ
        .date-row
            .wrapper
                DatePicker(label="Срок выполнения")
                DatePicker(label="Срок проверки")
            button.file 
                |Прикрепить файл 
        .center 
            button.btn(@click="$emit('modal-close', ModalName)") Подтвердить
                    
</template>

<script>
export default {
    props: ['blockId'],
    computed: {
        ModalName() {
            return `course-block-test-${this.blockId}`;
        }
    },
    data() 
    {
        return {
            test: [
                {
                    question: '',
                    answer: [
                        {
                            text: '',
                            corrent: false
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        AddAnswer(index) 
        {
            this.test[index].answer.push({
                text: '',
                corrent: false
            })
        },
        AddQuestion()
        {
            this.test.push({
                question: '',
                answer: [
                    {
                        text: '',
                        corrent: false
                    }
                ]
            })
        }
    }
}
</script>

<style lang="scss">

</style>