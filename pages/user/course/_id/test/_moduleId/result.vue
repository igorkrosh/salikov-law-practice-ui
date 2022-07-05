<template lang="pug">
.page-test-result.full-page
    .card(v-if="test != null && answers != null && task != null")
        .result.red(v-if="task.status == 'close'") Очень жаль, но тест не пройден.
        h3(v-if="task.status == 'close'") Попробуйте вернуться к изучению предыдущих уроков и затем пересдайте тест. Если возникли трудности — не стесняйтесь обратиться к кураторам курса, они будут рады помочь.
        .counter 
            .correct.item
                span Правильных
                b {{answers.correct}} \ {{answers.correct + answers.incorrect}}
            .wrong.item
                span Неправильных
                b {{answers.incorrect}} \ {{answers.correct + answers.incorrect}}
        h2 Ваши ответы
        .question(v-for="(question, index) in test.test")
            span.text(:class="{wrong: !answers.answers.result[index], correct: answers.answers.result[index]}") {{question.question}}
            .test-wrapper
                .wrapper(v-for="(answer, idx) in question.answer") 
                    label.radio(:class="{correct: answer.correct}") {{answer.text}}
                        input(type="checkbox" :value="idx" v-model="answers.answers.data[index]" disabled)
                        span.checkmark
                    .input-wrapper(v-if="answer.correct")
                        label Коментарий преподавателя 
                        textarea(disabled :value="answer.comment")
            
</template>

<script>
export default {
    data() {
        return {
            test: null,
            answers: null,
            task: null,
        }
    },
    methods: {
        LoadData()
        {
            this.$axios.$get(`/api/module/test/${this.moduleId}/`)
            .then(response => {
                this.test = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки теста', text: error.response.data.message, type: 'error'})
            })

            this.$axios.$get(`/api/module/test/${this.moduleId}/result`)
            .then(response => {
                this.answers = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки результата теста', text: error.response.data.message, type: 'error'})
            })

            this.$axios.$get(`/api/module/test/${this.moduleId}/progress`)
            .then(response => {
                this.task = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки статуса задачи', text: error.response.data.message, type: 'error'})
            })
        },
        ChechAnswer()
        {

        }
    },
    mounted() {
        this.courseId = this.$route.params.id;
        this.moduleId = this.$route.params.moduleId;

        this.$store.dispatch('SET_PAGETITLE', 'Название теста')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.LoadData();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.test-wrapper 
{
    .wrapper 
    {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
}
</style>