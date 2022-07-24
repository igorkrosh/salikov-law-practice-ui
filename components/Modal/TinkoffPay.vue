<template lang="pug">
Modal(name="modal-tinkoff" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .tinkoff-frame
        iframe(:src="paymentLink")
        .btn-modal-close(@click="$modal.hide('modal-tinkoff')")
</template>

<script>
export default {
    props: ['paymentLink'],
    methods: {
        HandleIframe(event)
        {
            if (event.data == 'payment_success')
            {
                console.log('asd')
                this.$modal.hide('modal-tinkoff');
            }
        }
    },
    mounted()
    {
        window.addEventListener("message", this.HandleIframe);
    }
}
</script>

<style lang="scss">
.tinkoff-frame 
{
    width: 700px;
    height: 550px;
    position: relative;

    iframe 
    {
        width: 100%;
        height: 100%;
        border: none;
    }
}
</style>