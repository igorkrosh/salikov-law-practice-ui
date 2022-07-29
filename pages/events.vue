<template lang="pug">
.col-wrapper 
    .col.first.page-events
        .calendar.block
            ClientOnly
                vc-calendar(is-expanded title-position="left" :masks="{ title: 'MMM', weekdays: 'WW' }" :attributes='attrs' color="none" @dayclick="HandlerDayClick")
        .events-wrapper(v-if="selectedEvents.length > 0")
            h4 {{selectedTitle}}
            .event(v-for="(item, index) in selectedEvents" :key="index")
                .type(:class="item.color")
                .text
                    .label {{item.label}}
                    .date {{new Date(item.date).toLocaleString('ru-RU')}}
                .calendar-btns  
                    a(
                        :href="`https://www.google.com/calendar/render?action=TEMPLATE&text=${item.label}&dates=${new Date(item.date).toISOString().replace(/-/g,'')}/${new Date(item.date).toISOString().replace(/-/g,'')}&details=&location=&sprop=&sprop=name:`"
                        target="_blank"
                    )  
                        img(src="/assets/images/icons/android.png")
                    a(
                        :href="`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://lk.kathedra.ru%0ADTSTART:${new Date(item.date).toISOString().replace(/-/g,'')}%0ADTEND:${new Date(item.date).toISOString().replace(/-/g,'')}%0ASUMMARY:${item.label}%0ADESCRIPTION:%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR`"
                        target="_blank"
                    )
                        img(src="/assets/images/icons/apple.png")
                
    ProfileColumnInfo(:calendar="false")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            attrs: [],
            selectedTitle: '',
            selectedEvents: [],
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
        },
        HandlerDayClick(day)
        {
            console.log(day)
            this.selectedEvents = [];
            this.selectedTitle = ''

            for(let event of day.attributes)
            {
                if (event.popover)
                {
                    this.selectedEvents.push({
                        date: event.dates[0].end,
                        color: event.highlight.base.color,
                        label: event.popover.label
                    })
                }
            }
            
            this.selectedTitle = day.ariaLabel
        },
        GenerateGoogleCalendatLink()
        {
            
        }
    },
    watch: {
        '$store.getters.CALENDAR': function () {
            this.SetDates();
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'События')
        this.SetDates();

    }
}
</script>

<style lang="scss">

</style>