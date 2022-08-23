<template lang="pug">
Modal(name="referral-create" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$modal.hide('referral-create')")
        h3 Создать источник
        .select-wrapper(:class="{error: errors.includes('type')}")
            label Тип источника
            select(v-model="referral.type")
                option(value="ref") Реферальная ссылка  
                option(value="ad") Реклама 
                option(value="soc") Соц. сеть 
        .input-wrapper(:class="{error: errors.includes('to')}")
            label Куда ведет:
            input(v-model="referral.to")
        .input-wrapper(:class="{error: errors.includes('comment')}")
            label Коментарий 
            textarea(v-model="referral.comment")
        .center 
            button.btn(@click="SaveReferral") Подтвердить
</template>

<script>
export default {
    data() {
        return {
            errors: [],
            referral: {
                type: 'ref',
                to: '',
                comment: '',
            }
        }
    },
    methods: {
        SaveReferral()
        {
            this.errors = [];

            if (this.referral.to == '')
            {
                this.errors.push('to');
                this.$notify({title: 'Ошибка создания источника', text: 'Проверьте правильность заполнения формы', type: 'error'})

                return;
            }

            this.$axios.$post(`/api/referral/create`, this.referral)
            .then(response => {
                this.$notify({title: 'Источник создан', text: '', type: 'success'})
                this.$modal.hide('referral-create')
                this.referral = {
                    type: 'ref',
                    to: '',
                    comment: '',
                }

                this.$emit('create-referral')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания источника', text: error.response.data.message, type: 'error'})
            })
        }
    }
}
</script>

<style>

</style>