<template lang="pug">
.page-test.full-page.page-homework
    .card(v-if="data")
        span.counter Вопрос {{index}} из {{data.test.length}}
        h3 {{data.test[index - 1].question}}
        .test-wrapper
            label.radio(v-for="(item, idx) in data.test[index - 1].answer") {{item.text}}
                input(type="checkbox" :value="idx" v-model="answer[index - 1]")
                span.checkmark
        .center 
            button.btn.blue.sm(@click="Prev") Назад
            button.btn.sm(@click="Next") Далее
        .btn-wrapper 
            a.link(v-if="data.file" :href="data.file" target="_blank") Скачать файл
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            courseId: 0,
            moduleId: 0,
            data: null,
            index: 1,
            answer: [],
        }
    },
    methods: {
        LoadTest()
        {
            this.$axios.$get(`/api/module/test/${this.moduleId}`)
            .then(response => {
                this.data = response;

                let count = this.data.test.length;


                for (let index = 0; index < count; index++)
                {
                    this.answer[index] = [];
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки модуля', text: error.response.data.message, type: 'error'})
            })
        },
        Next()
        {
            if (this.index >= this.data.test.length)
            {
                if (this.index == this.data.test.length)
                {
                    this.SendTest();
                }

                return;
            }

            this.index++;
        },
        Prev()
        {
            if (this.index <= 1)
            {
                return;
            }

            this.index--;
        },
        SendTest()
        {
            this.$axios.$post(`/api/module/test/${this.moduleId}/result`,{
                answers: this.answer
            })
            .then(response => {
                this.$router.push(`/user/course/${this.courseId}/test/${this.moduleId}/result`)
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки теста', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted() 
    {
        this.$store.dispatch('SET_PAGETITLE', 'Прохождение теста')
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);

        this.courseId = this.$route.params.id;
        this.moduleId = this.$route.params.moduleId;

        this.LoadTest();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>