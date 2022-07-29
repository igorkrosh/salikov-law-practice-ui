<template lang="pug">
Modal(name="modal-jurictic-pay" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.pay
        .btn-modal-close(@click="$modal.hide('modal-jurictic-pay')")
        h2 Заявка 
        form(@submit.prevent="EmitJurictic")
            .input-wrapper 
                label 
                    |Название компании
                    span.required *
                input(type="text" placeholder="" v-model="company_name" required)
            .input-wrapper 
                label 
                    |ИНН
                    span.required *
                input(type="text" placeholder="" v-model="inn" required)
            .input-wrapper 
                label ОГРН
                input(type="text" placeholder="" v-model="ogrn")
            .input-wrapper 
                label Рассчтеный счет
                input(type="text" placeholder="" v-model="account")
            .input-wrapper 
                label Адрес
                input(type="text" placeholder="" v-model="address")
            .btn-wrapper.center
                button.btn Отправить заявку
</template>

<script>
export default {
    props: ['tariff'],
    data() {
        return {
            company_name: '',
            inn: '',
            ogrn: '',
            account: '',
            address: ''
        }
    },
    methods: {
        SetJuricticUser()
        {
            this.company_name = this.$store.getters.USER.jurictic_data.company_name;
            this.inn = this.$store.getters.USER.jurictic_data.inn;
            this.ogrn = this.$store.getters.USER.jurictic_data.ogrn;
            this.account = this.$store.getters.USER.jurictic_data.account;
            this.address = this.$store.getters.USER.jurictic_data.address;
        },
        EmitJurictic()
        {
            this.$emit('send-jurictic', {
                company_name: this.company_name,
                inn: this.inn,
                ogrn: this.ogrn,
                account: this.account,
                address: this.address,
                tariff: this.tariff
            })
        }
    },
    watch: {
        '$store.getters.USER': function () {
            console.log('asdsad')
            this.SetJuricticUser();
        }
    }, 
}
</script>

<style lang="scss">
.card.pay 
{
    display: flex;
    flex-direction: column;
    align-items: center;

    form 
    {
        width: 100%;
    }

    .input-wrapper 
    {
        width: 100%;
    }
}
</style>