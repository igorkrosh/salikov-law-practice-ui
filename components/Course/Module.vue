<template lang="pug">
.course-dropdown(:class="{disable: !module.access}")
    .course-header.border-bottom(@click="OpenItem" :class="{active: active}")
        img(v-if="module.access" src="/assets/images/icons/dropdown.png")
        img(v-else src="/assets/images/icons/lock.png")
        b {{module.count}}
        span(v-if="module.access") {{module.title}}
        span(v-else) {{module.title}} (Доступ отсутствует)
    .course-wrapper(ref="wrapper")
        .detail 
            .item.border-bottom(v-for="(item, index) in module.data" :class="IconClass(item)")
                .info 
                    .date(v-if="item.date") {{item.date}}
                    .course-title {{item.title}} 
                    .name {{item.educator}}
                .type(:class="item.type")
                    span(v-if="item.type == 'stream'") Стрим
                    span(v-else-if="item.type == 'video'") Видео
                    span(v-else-if="item.type == 'job'") Домашнее задание
                    span(v-else-if="item.type == 'test'") Тест
                    span(v-else-if="item.type == 'none'") {{item.type}}
                NuxtLink(v-if="item.link && item.access" :to='item.link').link
            
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
        },
        IconClass(item) {
            if (item.access)
            {
                return item.icon
            }

            return 'lock disable';
        }  
    },
    computed: 
    {
          
    }
}
</script>

<style>
.course-dropdown.disable
{
    position: relative;
    filter: none;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #ededed;
    box-shadow: none;
}
.page-course-detail .course-dropdown.disable .course-header b, .page-course-detail .course-dropdown.disable .course-header span
{
    color: rgb(68, 68, 68);
}

.page-course-detail .detail .item.disable 
{
    opacity: 0.7;
}

.page-course-detail .detail .item.lock:before
{
    width: 25px;
    height: 25px;
    background: url(/assets/images/icons/lock.png);
}

</style>