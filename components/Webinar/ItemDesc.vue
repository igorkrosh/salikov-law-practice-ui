<template lang="pug">
.course-dropdown.buy
    .course-header.border-bottom(@click="OpenItem" :class="{active: active}")
        img(src="/assets/images/icons/dropdown.png")
        span {{module.name}}
    .course-wrapper(ref="wrapper")
        .detail 
            .text(v-html="module.desc")
                
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
        } 
    }
}
</script>

<style>

</style>