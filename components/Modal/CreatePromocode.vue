<template lang="pug">
Modal(name="promocode-create" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$modal.hide('promocode-create')")
        h3 Создать промокод
        .input-wrapper(:class="{error: errors.includes('code')}")
            label Промокод:
            input(v-model="promocode.code")
        .input-wrapper(:class="{error: errors.includes('value')}")
            label Размер скидки:
            input(v-model="promocode.value" type="number")
        .date-row 
            .wrapper
                DatePicker(label="Дата начала" v-model="promocode.date_start" mode="date")
            .wrapper
                DatePicker(label="Дата окончания" v-model="promocode.deadline" mode="date")
        .center 
            button.btn(@click="SavePromocode") Подтвердить
</template>

<script>
export default {
    data() {
        return {
            promocode: {
                code: '',
                value: '',
                date_start: new Date(),
                deadline: new Date()
            },
            errors: [],
        }
    },
    methods: {
        SavePromocode() {
            if (this.CheckForm())
            {
                this.$emit('create-promocode', this.promocode);
                this.promocode = {
                    code: '',
                    value: '',
                    date_start: new Date(),
                    deadline: new Date()
                }
                this.$modal.hide('promocode-create');
            }
            else 
            {
                this.$notify({title: 'Ошибка добавления промокода', text: 'Проверте правильность заполнения полей', type: 'error'})
            }
        },
        CheckForm()
        {
            this.errors = [];

            if (this.promocode.code == '')
            {
                this.errors.push('code')
            }

            if (this.promocode.value == '')
            {
                this.errors.push('value')
            }

            if (this.errors.length > 0)
            {                
                return false;
            }
            
            return true;
        }
    }
}
</script>

<style>

</style>