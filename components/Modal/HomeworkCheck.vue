<template lang="pug">
Modal(name="homework-modal" height="auto" width="800" classes="dialog" :adaptive="true" :scrollable="true")
    .card.homework-block(v-if="data")
        .btn-modal-close(@click="$emit('modal-close', 'homework-modal')")
        h3 Проверка задания 
        h4 Ученик: 
            NuxtLink(:to="`/profile/${data.user_id}`" target="_blank")
                <b>{{data.user}}</b>
        .desc(v-html="data.question")
        .block-wrapper 
            label Ответ
            .answer(v-html="data.answer")
            a.link(v-if="data.file" :href="data.file" target="_blank") Скачать файл 
        .block-wrapper 
            label Коментарий преподователя
            TextEditor(v-model="comment")
        .results-wrapper
                .icon.one(:class="{active: score == 'one'}" @click="score = 'one'")
                .icon.two(:class="{active: score == 'two'}" @click="score = 'two'")
                .icon.three(:class="{active: score == 'three'}" @click="score = 'three'")
                .icon.four(:class="{active: score == 'four'}" @click="score = 'four'")
                .icon.five(:class="{active: score == 'five'}" @click="score = 'five'")
        .center
            button.btn(@click="SendTask") Подтвердить
            
</template>

<script>
export default {
    props: ['taskId'],
    data() {
        return {
            data: null,
            comment: '',
            score: '',
        }
    },
    watch: {
        taskId() {
            this.LoadTask();
        }
    },
    methods: {
        LoadTask()
        {
            if (this.taskId == null)
            {
                return 
            }

            this.$axios.$get(`/api/task/${this.taskId}/get`)
            .then(response => {
                this.data = response;
                this.comment = this.data.comment;
                this.score = this.data.score;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки задания', text: error.response.data.message, type: 'error'});
            })
        },
        SendTask()
        {
            if (this.score == '')
            {
                this.$notify({title: 'Ошибка', text: 'Вы не поставили оценку', type: 'error'})
                return;
            }
            this.$axios.$post(`/api/task/${this.taskId}/check`, {
                comment: this.comment,
                score: this.score
            })
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Задание сохранено', type: 'success'})
                this.$emit('modal-close');
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки проверки', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted() {
        this.LoadTask();
    }
}
</script>

<style lang="scss">
.card.homework-block
{
    .block-wrapper 
    {
        .link 
        {
            margin-top: 10px;
            display: inline-block;
        }
    }
}

.card.homework-block .results-wrapper .icon.one:hover, .card.homework-block .results-wrapper .icon.one.active 
{
    opacity: 1;
}

.card.homework-block .results-wrapper .icon.one
{
    opacity: 0.5;
}
</style>