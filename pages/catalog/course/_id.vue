<template lang="pug">
.col-wrapper.full-page.page-course-detail.page-buy
    .wrapper(v-if="course")
        h2 Вы собираетесь приобрести курс: «{{course.name}}» 
        .course-info 
            span Дата начала: {{new Date(course.date_start).toLocaleDateString('ru-RU')}}
            span Продолжительность: {{course.hours}} ак. ч.
            span Уроки: {{course.lessons}}
        h3 Модули курса:
        CourseModuleBuy(v-for="(item, index) in course.modx.modules" :module="item" :access="accessModules[index]" :key="index" :count="index + 1")
        .tariffs
            h2.title Тарифы и варианты оплаты 
            .wrapper 
                CourseTariff(
                    v-for="(item, index) in course.modx.tariffs" 
                    :key="index" 
                    :tariff="item" 
                    :index="index" 
                    :active="selectedTariffIndex == index" 
                    @select-tariff="HandleSelectTariff"
                )
            .buy-wrapper(v-if="paymentOption.price > 0")
                .payment-wrapper(v-if="$store.getters.USER.jurictic == 0")
                    button.btn.buy(@click="TinkoffPay") Оплатить
                    button.btn.credit(@click="TinkoffCredit") В рассрочку
                .payment-wrapper(v-else)
                    button.btn.buy(@click="JuricticPay") Оставить заявку
            .buy-wrapper(v-else)
                .payment-wrapper
                    button.btn.buy(@click="TakeFreeCourse") Забрать

        ModalTinkoffPay(:paymentLink="paymentLink")
        ModalJuricticPay(:tariff="this.course.modx.tariffs[this.selectedTariffIndex].title" @send-jurictic="HandlerSendJurictic")
</template>

<script>
export default {
    middleware: "auth",
    data()
    {
        return {
            courseId: null,
            course: null,
            selectedTariffIndex: -1,
            accessModules: [],
            paymentOption: {},
            paymentLink: '',
            creaditOrderId: 0,
        }
    },
    methods: {
        LoadCourseConfig()
        {
            this.$axios.$get(`/api/course/${this.courseId}/get/all`)
            .then(response => {
                this.course = response;
                for (let index = 0; index < this.course.modx.modules.length; index++)
                {
                    this.accessModules.push(false)
                }

                this.SelectStartTariff()
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки курса', text: error.response.data.message, type: 'error'})
            })
        },
        DropAccess()
        {
            for (let index = 0; index < this.accessModules.length; index++)
            {
                this.accessModules[index] = false;
            }
        },
        HandleSelectTariff(tariff)
        {
            this.selectedTariffIndex = tariff;

            let access = this.course.modx.tariffs[this.selectedTariffIndex].access 
            
            this.DropAccess()

            if (access == 0)
            {
                for (let index = 0; index < this.accessModules.length; index++)
                {
                    this.accessModules[index] = true
                }
            }
            else 
            {
                for (let index = 0; index < access; index++)
                {
                    this.accessModules[index] = true
                }
            }

            this.paymentOption['price'] = this.course.modx.tariffs[this.selectedTariffIndex].price
            this.paymentOption['access'] = this.course.modx.tariffs[this.selectedTariffIndex].access
            this.paymentOption['access_days'] = this.course.modx.tariffs[this.selectedTariffIndex].access_days
            this.paymentOption['packet_name'] = this.course.modx.tariffs[this.selectedTariffIndex].title
        },
        TinkoffPay()
        {
            this.$axios.post(`/api/buy/course/${this.courseId}`, this.paymentOption)
            .then(response => {
                this.paymentLink = response.data.PaymentURL;
                this.$modal.show(`modal-tinkoff`);
            })
        },
        TinkoffCredit()
        {
            this.creaditOrderId = Date.now().toString()
            tinkoff.createDemo({
                shopId: 'fb922623-cdf2-4127-b368-de8016ad149c',
                showcaseId: 'b133c70f-18c8-4073-bc61-5f8704eb6a29',
                sum: this.paymentOption.price,
                orderNumber: this.creaditOrderId,
                successURL: 'http://lk.kathedra.ru/profile',
                items: [
                    {
                        name: `Покупка доступа к курсу "${this.course.name}" (${this.paymentOption.packet_name})`, 
                        price: this.paymentOption.price, 
                        quantity: 1
                    },
                ]
            })
        },
        TakeFreeCourse()
        {
            this.$axios.$post(`/api/buy/course/${this.course.id}/order/free`, this.paymentOption)
            .then(response => {
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания заказа', error: error.response.data.message, type: 'error'})
            })
        },
        HandlerTinkoffApproved(data)
        {
            console.log(data)
            this.$axios.$post(`/api/buy/course/${this.course.id}/order/create`, {
                price: this.paymentOption['price'],
                access: this.paymentOption['access'],
                access_days: this.paymentOption['access_days'],
                packet_name: this.paymentOption['packet_name'],
                order_id: this.creaditOrderId
            })
            .then(response => {})
            .catch(error => {
                this.$notify({title: 'Ошибка создания заказа', error: error.response.data.message, type: 'error'})
            })
            
        },
        HandlerTinkoffSigned(data)
        {
            data.meta.iframe.destroy();
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
        JuricticPay()
        {
            this.$modal.show(`modal-jurictic-pay`);
        },
        HandlerSendJurictic(juricticData)
        {
            this.$axios.$post(`/api/buy/course/${this.courseId}/order/jurictic`, juricticData)
            .then(response => {
                this.$modal.hide(`modal-jurictic-pay`);
                this.$notify({title: 'Заявка отправлена', text: 'С вами свяжутся в ближайшее время', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания заказа', error: error.response.data.message, type: 'error'})
            })
        }
    },
    watch: {
        '$store.getters.USER.id': function () {
            this.$echo.channel(`payment-notification.${this.$store.getters.USER.id}`)
            .listen('PaymentNotification', (e) => {
                console.log(e)
                if (e.status == 'CONFIRMED')
                {
                    this.$notify({title: 'Оплачео', text: 'Вы будете перенаправлены на страницу курса', type: 'success'})
                    this.$router.push(`/user/course/${this.courseId}`)
                }
            })
        }
    },
    mounted()
    {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.$store.dispatch('SET_PAGETITLE', 'Покупка курса')
        this.courseId = this.$route.params.id;
        this.LoadCourseConfig();

        tinkoff.methods.on(tinkoff.constants.APPROVED, this.HandlerTinkoffApproved);
        tinkoff.methods.on(tinkoff.constants.SUCCESS, this.HandlerTinkoffSigned);
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>