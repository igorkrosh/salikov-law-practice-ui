<template lang="pug">
    .question-item
        .question(@click="OpenAnswer" :class="{active: active}") {{item.question}}
        .answer-wrapper(ref="answer")
            .answer {{item.answer}}
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            active: false
        }
    },
    methods: {
        OpenAnswer() {

            if (this.active == false)
            {
                let height = this.$refs.answer.querySelector('.answer').offsetHeight;
                this.$refs.answer.style.height = `${height}px`;

                this.active = true;
            }
            else 
            {
                this.$refs.answer.style.height = `0px`;

                this.active = false;
            }

            
        }
    }
}
</script>

<style>

</style>