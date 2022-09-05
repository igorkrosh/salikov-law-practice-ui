<template lang="pug">
.full-page.page-reviews
    .page-statistic
        .filter-radio
            label.radio Курсы
                input(type="radio" value="course" v-model="type")
                span.checkmark
            label.radio Вебинар
                input(type="radio" value="webinar" v-model="type")
                span.checkmark
            label.radio Стрим
                input(type="radio" value="stream" v-model="type")
                span.checkmark
            label.radio Материалы
                input(type="radio" value="video" v-model="type")
                span.checkmark
    ReviewTable(:table="table")
</template>

<script>
export default {
    data() {
        return {
            table: [],
            type: 'course'
        }
    },
    methods: {
        GetTableData()
        {
            this.$axios.$get(`/api/review/${this.type}/all`)
            .then(response => {
                this.table = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки отзывов', text: error.response.data.message, type: 'error'})
            })
        }
    },
    watch: {
        type()
        {
            this.GetTableData();
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_PAGETITLE', 'Отзывы');
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true);
        this.GetTableData();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.page-reviews
{
    .filter-radio
    {
        display: flex;
    }
}
</style>