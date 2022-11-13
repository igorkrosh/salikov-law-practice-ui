<template lang="pug">
.col-wrapper.full-page.page-course-detail.page-buy
    .wrapper(v-if="webinar")
        h2 Вы собираетесь приобрести вебинар: «{{webinar.name}}» 
        .course-info 
            span Дата начала: {{new Date(webinar.date_start).toLocaleDateString('ru-RU')}}
        h3 Описание курса:
        WebinarItemDesc(v-for="(item, index) in webinar.modx.modules" :module="item" :key="index")
        .tariffs(v-if="!access")
            h2.title Тарифы и варианты оплаты 
            .wrapper 
                CourseTariff(
                    v-for="(item, index) in webinar.modx.tariffs" 
                    :key="index" 
                    :tariff="item" 
                    :index="index" 
                    :active="selectedTariffIndex == index" 
                    @select-tariff="HandleSelectTariff"
                )
            .buy-wrapper(v-if="paymentOption.price > 0")
                .payment-wrapper(v-if="$store.getters.USER.jurictic == 0")
                    button.btn.buy(@click="TinkoffPay") Оплатить
                    //button.btn.credit(@click="TinkoffCredit") В рассрочку
                .payment-wrapper(v-else)
                    button.btn.buy(@click="JuricticPay") Оставить заявку
            .buy-wrapper(v-else)
                .payment-wrapper
                    button.btn.buy(@click="TakeFreeWebinar") Забрать
            Agreement
        .tariffs(v-else)
            h3.access-true Вы уже имете доступ к данному вебинару
        ModalTinkoffPay(:paymentLink="paymentLink")
        ModalJuricticPay(:tariff="this.webinar.name" @send-jurictic="HandlerSendJurictic")
</template>

<script>
export default {
    middleware: "auth",
    data()
    {
        return {
            webinarId: null,
            webinar: null,
            selectedTariffIndex: -1,
            paymentLink: '',
            paymentOption: {},
            creaditOrderId: 0,
            access: false
        }
    },
    methods: {
        LoadWebinar()
        {
            this.$axios.$get(`/api/check/webinar/${this.webinarId}/access`)
            .then(response => {
                this.access = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки доступа', text: error.response.data.message, type: 'error'})
            })

            this.$axios.$get(`/api/webinar/${this.webinarId}/config`)
            .then(response => {
                this.webinar = response;

                this.SelectStartTariff()
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки вебинара', text: error.response.data.message, type: 'error'})
            })
        },
        TakeFreeWebinar()
        {
            this.$axios.$post(`/api/buy/webinar/${this.webinar.id}/order/free`, this.paymentOption)
            .then(response => {
                this.$store.dispatch("LOAD_PROFILE");
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания заказа', error: error.response.data.message, type: 'error'})
            })
        },
        TinkoffPay() 
        {
            this.$axios.post(`/api/buy/webinar/${this.webinarId}`, this.paymentOption)
            .then(response => {
                this.paymentLink = response.data.PaymentURL;
                this.$modal.show(`modal-tinkoff`);
            })
        },
        JuricticPay() 
        {
            this.$modal.show(`modal-jurictic-pay`);
        },
        HandlerSendJurictic(juricticData)
        {
            this.$axios.$post(`/api/buy/webinar/${this.webinarId}/order/jurictic`, juricticData)
            .then(response => {
                this.$modal.hide(`modal-jurictic-pay`);
                this.$notify({title: 'Заявка отправлена', text: 'С вами свяжутся в ближайшее время', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания заказа', error: error.response.data.message, type: 'error'})
            })
        },
        HandleSelectTariff(tariff)
        {
            this.selectedTariffIndex = tariff;

            this.paymentOption['price'] = this.webinar.modx.tariffs[this.selectedTariffIndex].price
            this.paymentOption['access_days'] = this.webinar.modx.tariffs[this.selectedTariffIndex].access_days
            this.paymentOption['packet_name'] = this.webinar.modx.tariffs[this.selectedTariffIndex].title
        },
        SelectStartTariff()
        {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            let packet = urlParams.get('packet')

            if (packet != null)
            {
                this.HandleSelectTariff(packet)
            }
            else 
            {
                this.HandleSelectTariff(0)
            }
        },
    },
    watch: {
        '$store.getters.USER.id': function () {
            console.log('asd')
            this.$echo.channel(`payment-notification.${this.$store.getters.USER.id}`)
            .listen('PaymentNotification', (e) => {
                console.log(e)
                if (e.status == 'CONFIRMED')
                {
                    this.$notify({title: 'Оплачео', text: 'Вы будете перенаправлены на главную страницу', type: 'success'})
                    this.$store.dispatch("LOAD_PROFILE");
                    this.$router.push(`/dashboard`)
                }
            })
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Покупка вебинара')
        this.webinarId = this.$route.params.id;
        this.LoadWebinar()

        tinkoff.methods.on(tinkoff.constants.APPROVED, this.HandlerTinkoffApproved);
        tinkoff.methods.on(tinkoff.constants.SUCCESS, this.HandlerTinkoffSigned);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style>
.access-true
{
    text-align: center;
}
</style>