<template lang="pug">
.col-wrapper 
    .col.first
        .page-homework 
            .filter-wrapper 
                .input-wrapper
                    input(placeholder="Поиск по ученику")
                .input-wrapper
                    input(placeholder="Поиск по дате")
                .input-wrapper
                    input(placeholder="Поиск по заданию")
            .journal.block
                .item-wrapper
                    .item(v-for="(item, index) in this.$store.getters['admin/TASKS']" :key="index" @click="ShowModal(item.task_id)")
                        .row.results-wrapper
                            img(src="~/assets/images/icons/achievements/1.png", alt="" v-if="item.score == ''").icon
                            .icon(v-else :class="item.score" )
                            .wrapper 
                                .wrapper
                                    .item-title Ученик: {{item.user}}
                                    .date Срок сдачи: {{item.date}}
                                .text
                                    b {{item.course}}
                                .text {{item.module}}
                ModalHomeworkCheck(@modal-close="HideModal" :taskId="taskId")
    ProfileColumnInfo
</template>

<script>
export default {
    data() {
        return {
            taskId: null,
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Задания учеников')
    },
    methods: {
        ShowModal(id)
        {
            this.taskId = id;
            this.$modal.show('homework-modal')
        },
        HideModal()
        {
            this.$modal.hide('homework-modal')
        }
    }
}
</script>

<style lang="scss">
.page-homework 
{
    .filter-wrapper 
    {
        display: flex;
        justify-content: space-between;
    }

    .journal.block .item
    {
        display: flex;
        cursor: pointer;
        padding: 10px;

        .row 
        {
            margin-bottom: 0;
        }
        .wrapper 
        {
            width: 100%;
            .wrapper 
            {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 0;
                margin-bottom: 10px;
            }
        }
    }
}

</style>