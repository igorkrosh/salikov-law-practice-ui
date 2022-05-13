<template lang="pug">
    .page-support.page
        SupportItem(v-for="(item, index) in this.questions" :key="index" :item="item")
        .btn-wrapper 
            NuxtLink(to="/callback").btn Написать в техподдержку
                    
</template>

<script>
export default {
    data() {
        return {
            questions: [
                {
                    question: 'Как получить доступ к курсу в личном кабинете?',
                    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    question: 'Как получить доступ к курсу в личном кабинете?',
                    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    question: 'Как получить доступ к курсу в личном кабинете?',
                    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }
            ]
        }
        
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Поддержка')
    }
}
</script>

<style lang="scss">
.page-support 
{
    .btn-wrapper 
    {
        display: flex;
        justify-content: flex-end;
    }
}
.question-item 
{
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.2);
    margin-bottom: 30px;
    overflow: hidden;

    .question
    {
        font-size: 24px;
        font-weight: 600;
        padding-right: 30px;
        position: relative;
        padding: 25px;
        padding-right: 50px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.0);
        transition: 0.5s;
        cursor: pointer;
    }

    .question.active 
    {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    }

    .question:after 
    {
        content: '';
        width: 16px;
        height: 8px;
        background: url(~assets/images/icons/right_blue.png);
        position: absolute;
        right: 25px;
        top: 2px;
        bottom: 0;
        margin: auto;
        transition: 0.5s;
    }

    .question.active:after 
    {
        transform: rotate(180deg);
    }

    .answer-wrapper
    {
        height: 0;
        overflow: hidden;
        transition: 0.5s;

        .answer 
        {
            padding: 25px;
        }
    }
}
</style>