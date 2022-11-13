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
                span {{module.hoursTheory}} часов теории
                span {{module.hoursPractice}} часов практики
                
            
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

</style>