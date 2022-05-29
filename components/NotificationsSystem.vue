<template lang="pug">
notifications(position="top right" :speed="500" :duration="50000")
</template>

<script>
export default {

}
</script>

<style lang="scss">
section.lk 
{
    .vue-notification-group
    {
        margin-top: 15px;
    }
    .vue-notification:hover 
    {
        opacity: 0.7;
    }
    .vue-notification {
    // styling
    margin: 0;
    margin-bottom: 5px;
    padding-left: 25px;
    font-size: 12px;
    color: #ffffff;
    cursor: pointer;
    transition: 0.3s;

    
    // default (blue)
    background: #44A4FC;
    border-left: 5px solid #187FE7;

    .notification-title 
    {
        font-size: 16px;
    }

    .notification-content 
    {
        font-size: 13px;
    }

    // types (green, amber, red)
    &.success {
        background: #68CD86;
        border-left-color: #42A85F;
    }

    &.warn {
        background: #ffb648;
        border-left-color: #f48a06;
    }

    &.error {
        background: #E54D42;
        border-left-color: #B82E24;
    }
    }
}

</style>