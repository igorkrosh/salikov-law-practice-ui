<template lang="pug">
.table-data 
    table
        thead
            tr
                th Пользователь
                th {{type}}
                th Оценка
                th.date Дата
                th.review Отзыв
        tbody
            tr(v-for="row in table") 
                td
                    NuxtLink(:to="`/profile/${row.user.id}`").user
                        img(v-if="row.user.avatar" :src="row.user.avatar", alt="").avatar
                        img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                        span {{row.user.name}}
                td {{row.name}}
                td 
                    .scores 
                        span <b>Спикер:</b> {{row.speakers}}
                        span <b>Материал:</b> {{row.material}}
                        span <b>Раздаточный материал:</b> {{row.files}}
                        span <b>Полезность:</b> {{row.useful}}
                td {{row.date}}
                td 
                    button.btn.sm.blue(@click="HandleBtnClick(row.user.name, row.text)") Смотреть отзыв
    ModalReview(:name="selectName" :text="selectText")
</template>

<script>
export default {
    props: ['table'],
    data() {
        return {
            type: '',
            selectName: '',
            selectText: '',
        }
    },
    methods: {
        HandleBtnClick(name, text)
        {
            this.selectName = name
            this.selectText = text

            this.$modal.show('review')
        }
    },
    mounted() {
        if (this.$route.name == 'reviews')
        {
            this.type = 'Курс'
        }
        if (this.$route.name == 'reviews-webinars')
        {
            this.type = 'Вебинар'
        }
        if (this.$route.name == 'reviews-modules')
        {
            this.type = 'Материал'
        }
    }
}
</script>

<style lang="scss">

</style>