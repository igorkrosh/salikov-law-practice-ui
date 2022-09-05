<template lang="pug">
.table-review 
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
.table-review 
{
    margin-top: 40px;
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid #ededed;

    table 
    {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        table-layout: fixed;
    }

    th, td
    {
        text-align: left;
        padding: 15px 10px;
    }
    
    th.review
    {
        width: 160px;
    }

    th.date
    {
        width: 100px;
    }

    tr 
    {
        border-bottom: 1px solid #ededed;
    }

    .user:hover 
    {
        background: #ededed;
    }

    .user 
    {   
        display: flex;
        align-items: center; 
        padding: 5px;
        transition: 0.3s;
        border-radius: 15px;
        img
        {
            border-radius: 50%;
            max-width: 47px;
            max-height: 47px;
            margin-right: 10px;
        }

    }

    .scores 
    {
        display: flex;
        flex-direction: column;
    }
}
</style>