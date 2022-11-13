<template lang="pug">
.agreement-wrapper
    span 
        |Нажимая на кнопку, вы соглашаетесь с 
        a.link(target="_blank" href="/assets/files/personal_data.pdf") Условием обработки перс. данных
        |, а так же с 
        a.link(target="_blank" href="/assets/files/services.pdf") Условиями продажи
</template>

<script>
export default {
    
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">
.agreement-wrapper
{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 12px;

    .link 
    {
        font-size: 12px;
    }
}
</style>