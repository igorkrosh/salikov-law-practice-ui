<template lang="pug">
.course-dropdown
    .course-header.border-bottom(@click="OpenItem" :class="{active: active}")
        img(src="/assets/images/icons/dropdown.png")
        b {{module.count}}
        span {{module.title}}
    .course-wrapper(ref="wrapper")
        .detail 
            .item.border-bottom(v-for="(item, index) in module.data" :class="item.icon")
                .info 
                    .date {{item.date}}
                    .course-title {{item.title}}
                    .name {{item.educator}}
                .type(:class="item.type")
                    span(v-if="item.type == 'webinar'") Вебинар
                    span(v-else-if="item.type == 'record'") Запись
                    span(v-else-if="item.type == 'homework'") Домашнее задание
                    span(v-else-if="item.type == 'test'") Тест
                    span(v-else-if="item.type == 'none'") {{item.type}}
            
</template>

<script>
export default {
    props: ['module'],
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
    },
}
</script>

<style>

</style>