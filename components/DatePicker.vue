<template lang="pug">
ClientOnly
    vc-date-picker(
        class="calendar popover" 
        title-position="left" 
        :masks="{ title: 'MMM', weekdays: 'WW' }" 
        color="none" 
        v-model="date" 
        :select-attribute="selectAttribute" 
        :mode="mode" 
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
    //props: ['label', 'value'],
    props: {
        label: String,
        value: [String, Date],
        mode: {
            type: String,
            default: 'dateTime'
        }
    },
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
        },
        ConverDate()
        {
            if (typeof this.value == 'object')
            {
                this.date = this.value;
            }
            if (typeof this.value == 'string')
            {
                let [day, month, year] = this.value.split(' ')[0].split('.');
                let [hours, minutes] = this.value.split(' ')[1].split(':');

                this.date = new Date(+year, +month - 1, +day, +hours, +minutes);
            }
        }
    },
    watch: {
        value()
        {
            //console.log(typeof this.value)
            //console.log(`${typeof this.value} - ${this.value}`)

            this.ConverDate()
        }
    },
    mounted() {
        console.log(`${typeof this.value} - ${this.value}`)
        this.ConverDate()

    }
}
</script>

<style lang="scss">

</style>