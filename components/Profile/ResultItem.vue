<template lang="pug">
.item.result(@click="$modal.show(`task-result-${item.id}`)")
    .icon(:class="item.type")
    .desc 
        .item-title {{item.title}}
        .wrapper 
            .name {{item.lectors}} 
            .date {{item.date}}
    ModalTaskResult(:title="item.title" :job="item.job", :answer="item.answer" :comment="item.comment" :score="item.type" :id="item.id")
</template>

<script>
export default {
    props: ['item']
}
</script>

<style>
.item.result
{
    padding: 10px;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
}


.item.result:hover
{
    background: #fff;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
}
</style>