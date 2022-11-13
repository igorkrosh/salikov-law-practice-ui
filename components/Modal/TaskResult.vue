<template lang="pug">
    Modal(:name="`task-result-${id}`" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
        .card.homework-block
            .btn-modal-close(@click="$modal.hide(`task-result-${id}`)")
            h3 {{title}}
            .desc(v-html="job")
            .block-wrapper 
                label Ответ
                .answer(v-html="answer")
            .block-wrapper(v-if="comment")
                label Коментарий преподователя
                .answer(v-html="comment")
            .results-wrapper.no-pointer
                .icon.one(:class="{active: score == 'one'}")
                .icon.two(:class="{active: score == 'two'}")
                .icon.three(:class="{active: score == 'three'}")
                .icon.four(:class="{active: score == 'four'}")
                .icon.five(:class="{active: score == 'five'}")
    </template>
    
    <script>
    export default {
        props: ['title', 'job', 'answer', 'score', 'comment', 'id']
    }
    </script>
    
    <style>
    
    </style>