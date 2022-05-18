<template lang="pug">
    vc-date-picker(class="calendar popover" title-position="left" :masks="{ title: 'MMM', weekdays: 'WW' }" color="none" v-model="date" :select-attribute="selectAttribute" )
        template(v-slot="{ inputValue, togglePopover }")
            .date-wrapper 
                label {{label}}
                .date
                    button(@click="togglePopover()") 
                        img(src="/assets/images/icons/calendar.png")
                    input(:value="inputValue" readonly)
</template>

<script>
export default {
    props: ['label'],
    data() {
        return {
            date: new Date(),
            selectAttribute: {
                highlight: {
                    
                },
                contentStyle: {
                    color: 'grey',
                }
            },
        };
    },
}
</script>

<style lang="scss">
.calendar.popover .vc-container .vc-weeks
{
    grid-template-columns: repeat(7, 32px);
    grid-auto-rows: 32px;
    grid-row-gap: 10px;
    grid-column-gap: 17px;
}

.calendar.popover .vc-popover-content 
{
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
}

.calendar.popover .vc-container .vc-header
{
    padding: 25px;
    padding-bottom: 0;
    margin-bottom: 10px;
}

.calendar.popover .vc-weeks
{
    padding: 20px;
    padding-top: 0;
}

.calendar.popover .vc-arrows-container
{
    top: 15px;
}

.calendar.popover .vc-highlights
{
    border-radius: 50%;
    background: #ededed;
}

.calendar.popover .vc-highlights ~ span 
{
    font-weight: 700;
}

.calendar.popover .date-wrapper 
{
    display: flex;
    flex-direction: column;
    width: 155px;

    label 
    {
        font-size: 14px;
        margin-bottom: 5px;
    }

    .date 
    {
        display: flex;
        padding: 0 5px;
        border: 1px solid #dedede;
        height: 30px;
        align-items: center;

        button 
        {
            border: none;
            background: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        input 
        {
            border: none;
            color: #8b8b8b;
            font-family: 'OpenSans';
            width: 100%;
        }
    }
    
}
</style>