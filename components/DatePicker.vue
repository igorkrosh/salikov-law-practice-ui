<template lang="pug">
ClientOnly
    vc-date-picker(
        class="calendar popover" 
        title-position="left" 
        :masks="{ title: 'MMM', weekdays: 'WW' }" 
        color="none" 
        v-model="date" 
        :select-attribute="selectAttribute" 
        mode="dateTime" 
        is24hr
        @input="OnInput"
    )
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
    props: ['label', 'value'],
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
    methods: {
        OnInput()
        {
            this.$emit('input', this.date);
        }
    },
    watch: {
        value()
        {
            this.date = new Date(this.value);
        }
    },
    mounted() {
        this.date = this.value;

    }
}
</script>

<style lang="scss">

</style>