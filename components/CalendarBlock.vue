<template lang="pug">
.calendar.block
    ClientOnly
        vc-calendar(is-expanded title-position="left" :masks="{ title: 'MMM', weekdays: 'WW' }" :attributes='attrs' color="none")
</template>

<script>
export default {
    data() {
        return {
            attrs: [
                
            ]
        }
    },
    methods: {
        SetDates()
        {
            this.attrs = [];
            this.attrs.push({
                key: 'today',
                highlight: false,
                dates: new Date(),
            })

            for (let date of this.$store.getters.CALENDAR)
            {
                this.attrs.push({
                    highlight: {
                        color: date.color,
                        fillMode: 'light'
                    },
                    dates: new Date(date.date),
                    popover: {
                        label: date.text,
                        visibility: 'focus'
                    }
                })
            }
        }
    },
    watch: {
        '$store.getters.CALENDAR': function () {
            this.SetDates();
        }
    },
    mounted()
    {
        this.SetDates();
    }
}
</script>

<style lang="scss">
.calendar .vc-container
{
    border: none;
    font-family: 'OpenSans';    

    .vc-title 
    {
        color: #000;
        text-transform: capitalize;
        font-size: 20px;
        font-weight: 400;
    }

    .vc-header 
    {
        margin-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .vc-arrow 
    {
        border-radius: 50%;
        transition: 0.3s;
    }

    .vc-arrow:hover
    {
        color: #000;
    }
    
    .vc-weekday
    {
        font-weight: 400;
        text-transform: capitalize;
    }

    .vc-day.is-not-in-month *
    {
        opacity: 0.5;
    }

    .vc-weeks
    {
        grid-template-columns: repeat(7, 32px);
        grid-auto-rows: 32px;
        grid-row-gap: 10px;
        grid-column-gap: 27px;
    }

    .is-today .vc-day-content
    {
        background: none;
        border: 2px solid #f2d3b7;
        color: #000;
    }

    .vc-day-content
    {
        width: 100%;
        height: 100%;
    }
}
</style>