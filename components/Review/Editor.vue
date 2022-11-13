<template lang="pug">
.review-wrapper
    h3 Пожалуйста, оцените курс по 10-балльной шкале:
    .review(:class="{error: errors.includes('speakers')}")
        span Выступление спикера
        ReviewScore(v-model="review.score.speakers")
    .review(:class="{error: errors.includes('material')}")
        span Качество материала
        ReviewScore(v-model="review.score.material")
    .review(:class="{error: errors.includes('files')}")
        span Качество раздаточного материала
        ReviewScore(v-model="review.score.files")
    .review(:class="{error: errors.includes('useful')}")
        span Общая полезность
        ReviewScore(v-model="review.score.useful")
    .input-wrapper 
        textarea(placeholder="Ваш коментарий ..." v-model="review.text")
    .btn-wrapper 
        button.btn(@click="SendReview") Подтвердить
</template>

<script>
export default {
    props: ['type', 'id'],
    data() {
        return {
            errors: [],
            review: {
                score: {
                    speakers: 0,
                    material: 0,
                    files: 0,
                    useful: 0,
                },
                text: '',
            },
            method: 'add',
        }
    },
    methods: {
        SendReview()
        {
            if (!this.CheckReviewForm())
            {
                this.$notify({title: 'Ошибка отправки отзыва', text: 'Форма содержит ошибки', type: 'error'})
                return;
            }
            
            this.$axios.$post(`/api/review/${this.type}/${this.id}/${this.method}`, this.review)
            .then(response => {
                this.$notify({title: 'Спасибо за отзыв!', text: 'Ваш отзыв опубликован', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки отзыва', text: error.response.data.message, type: 'error'})
            })
        },
        CheckReviewForm()
        {
            this.errors = [];

            if (this.review.score.speakers == 0)
            {
                this.errors.push('speakers')
            }

            if (this.review.score.material == 0)
            {
                this.errors.push('material')
            }

            if (this.review.score.files == 0)
            {
                this.errors.push('files')
            }

            if (this.review.score.useful == 0)
            {
                this.errors.push('useful')
            }

            if (this.errors.length == 0)
            {
                return true;
            }

            return false;
        }
    },
    mounted() {
        console.log('asd')
        this.$axios.$get(`/api/review/${this.type}/${this.id}/get`)
        .then(response => {
            if (response != '')
            {
                this.method = 'edit'
                this.review.score.speakers = response.speakers
                this.review.score.material = response.material
                this.review.score.files = response.files
                this.review.score.useful = response.useful
                this.review.text = response.text
            }
        })
    }
}
</script>

<style lang="scss">
.review-wrapper
{
    margin-top: 40px;
    margin-bottom: 40px;
    h3 
    {
        margin-bottom: 35px;
    }
    .review 
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    .review.error 
    {
        color: #a90808;
    }

    .star 
    {
        padding: 0;
        border: none;
        background: none;
        margin: 2px;
        filter: grayscale(100%);
        transition: 0.3s;
    }

    .star:hover 
    {
        filter: grayscale(0%);
    }

    .star.active 
    {
        filter: none;
    }

    .input-wrapper textarea
    {
        padding: 20px;
        font-family: "OpenSans";
    }
}

@media(max-width: 768px)
{
    .review-wrapper
    {
        .review 
        {
            flex-direction: column;
        }

        .score-wrapper
        {
            margin-top: 10px;
        }

        .btn-wrapper
        {
            text-align: center;
        }
    }
}
</style>