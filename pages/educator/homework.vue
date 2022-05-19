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
                    .item(@click="ShowModal")
                        .row
                            img(src="~/assets/images/icons/achievements/1.png", alt="").icon
                            .wrapper 
                                .wrapper
                                    .item-title Ученик: Иванов И.И.
                                    .date Срок сдачи: 22.04.22
                                .text Задание по курсу: Обращение взыскания на интеллектуальную собственность
                ModalHomeworkCheck(@modal-close="HideModal")
    ProfileColumnInfo
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Задания учеников')
    },
    methods: {
        ShowModal()
        {
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