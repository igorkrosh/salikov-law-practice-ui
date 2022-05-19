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

</style>