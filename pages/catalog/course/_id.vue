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
            .payment-wrapper 
                button.btn.buy(@click="TinkoffPay") Оплатить
                button.btn.credit(@click="TinkoffCredit") В рассрочку
    ModalTinkoffPay(:paymentLink="paymentLink")
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
            paymentLink: ''
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
            let orderId = Date.now().toString()
            console.log(orderId)
            console.log(`http://api.kathedra.ru/api/buy/credit/${this.$store.getters.USER.id}/notification`)
            tinkoff.createDemo({
                shopId: 'fb922623-cdf2-4127-b368-de8016ad149c',
                showcaseId: 'b133c70f-18c8-4073-bc61-5f8704eb6a29',
                sum: this.paymentOption.price,
                webhookURL: `http://api.kathedra.ru/api/buy/credit/${this.$store.getters.USER.id}/notification`,
                orderNumber: orderId,
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
        HandlerTinkoffSuccess(data)
        {
            console.log(data)
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

        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let packet = urlParams.get('packet')

        if (packet != null)
        {
            this.selectedTariffIndex = packet;
        }
        else 
        {
            this.selectedTariffIndex = 1;
        }

    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">
.page-course-detail.page-buy
{
    .wrapper
    {
        width: 100%;
    }

    .course-dropdown.buy.disable 
    {
        pointer-events: all;
    }

    .course-dropdown.buy.disable  .course-header.active img
    {
        transform: none;
    }

    .tariffs
    {
        margin-top: 60px;

        .title::after 
        {
            content: '';
            width: 38px;
            height: 37px;
            background: url(/assets/images/icons/ask.png);
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }

        .wrapper 
        {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 270px);
            grid-gap: 12px;
        }

        .payment-wrapper 
        {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 25px;

            .btn.credit 
            {
                background: #354c55;
                border-color: #354c55;
                color: #fff;
                margin-left: 15px;
            }
        }
    }
}
</style>