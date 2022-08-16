<template lang="pug">
.course-dropdown.buy(:class="{disable: !access}")
    .course-header.border-bottom(@click="OpenItem" :class="{active: active}")
        img(v-if="access" src="/assets/images/icons/dropdown.png")
        img(v-else src="/assets/images/icons/lock.png")
        b Модуль {{count}}.
        span {{module.name}}
    .course-wrapper(ref="wrapper")
        .detail 
            .text(v-html="module.desc")
            .date 
                span 12 часов теории
                span 12 часов практики
                
            
</template>

<script>
export default {
    props: ['module', 'access', 'count'],
    data() {
        return {
            active: false,
        }
    },
    methods: {
        OpenItem()
        {
            if (this.active == false)
            {
                let height = this.$refs.wrapper.querySelector('.detail').offsetHeight;
                this.$refs.wrapper.style.height = `${height}px`;

                this.active = true;
            }
            else 
            {
                this.$refs.wrapper.style.height = `0px`;

                this.active = false;
            }
        },
        IconClass(item) {
            if (item.access)
            {
                return item.icon
            }

            return 'lock disable';
        }  
    }
}
</script>

<style lang="scss">
.course-dropdown.buy.disable
{
    .course-header.border-bottom:not(.active):after
    {
        background: none;
    }
}
.course-dropdown.buy
{
    /*
    background: none;
    box-shadow: none;
    */

    .course-header.border-bottom:not(.active):after
    {
        //background: #dddddd;
    }

    .detail
    {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        padding: 15px;

        .text 
        {
            font-size: 15px;
            padding-left: 30px;
            width: 80%;

            ul 
            {
                padding-left: 0;
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                margin-top: 40px;

                li 
                {
                    width: 50%;
                    padding-left: 20px;
                    position: relative;
                    font-weight: 700;
                    margin-bottom: 25px;
                }

                li:after 
                {
                    content: '';
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background: #80a6b4;
                    border-radius: 50%;
                }
            }
        }

        .date 
        {
            display: flex;
            flex-direction: column;
            width: 20%;
            font-size: 15px;
            font-weight: 700;
            position: relative;
            padding-left: 40px;
        }

        .date:after 
        {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background: url(/assets/images/icons/deadline2.png);
            width: 31px;
            height: 27px;
        }
    }

}

</style>