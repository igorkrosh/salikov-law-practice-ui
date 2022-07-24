<template>
<button type="button" class="TINKOFF_BTN_YELLOW" @click="CreateForm"></button>
</template>

<script>
export default {
    props: ['price', 'title'],
    methods: {
        CreateForm()
        {
            tinkoff.createDemo({
                shopId: 'fb922623-cdf2-4127-b368-de8016ad149c',
                showcaseId: 'b133c70f-18c8-4073-bc61-5f8704eb6a29',
                demoFlow: 'sms',
                items: [
                    {name: `Доступ к курсу: "${this.title}"`, price: this.price, quantity: 1},
                ],
                sum: this.price
            })
        }
    }
}
</script>

<style>

</style>