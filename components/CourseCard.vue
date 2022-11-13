<template lang="pug">
NuxtLink(:to="link").course-card
    .img
        img(:src="item.image", alt="")
        span(v-if="item.duration") {{formatDate}} / {{item.duration}}
        span(v-else) {{formatDate}}
    .desc
        span.name {{item.title}}
        span.lectors {{item.lectors}}
        .btn-wrapper 
            button.btn Перейти
            button.tag {{item.type == 'webinar' ? 'Вебинар' : item.type}}
    .tag-wrapper
        .tag.done(v-if="item.status == 'done'") Запись
        .tag.deadline(v-if="item.deadline") до {{item.deadline}}
</template>

<script>
export default {
    props: {
        item: Object,
        link: {
            type: String,
            default: '#',
        }
    },
    data() {
        return {
            formatDate: '',
        }
    },
    mounted()
    {
        this.formatDate = new Date(this.item.date).toLocaleDateString('ru-RU')
    }
}
</script>

<style lang="scss">
.course-card 
{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    position: relative;

    .tag-wrapper 
    {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 0;
        padding: 15px;

        .tag.done 
        {
            background: #f1b2b2;
            color: #a90808;
        }

        .tag.deadline 
        {
            background: #f48a06;
            color: #fff;
        } 

        .tag 
        {
            padding: 5px 10px;
            margin-top: 10px;
        }

        .tag:first-child
        {
            margin-top: 0px;
        }
    }

    .img 
    {
        width: 100%;
        height: 215px;
        position: relative;
        padding: 15px;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        

        img 
        {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: 0.5s;
            min-width: 100%;
            max-width: 500px;
        }
        span 
        {
            color: #fff;
            font-weight: 700;
            position: relative;
            z-index: 10;
        }
    }

    .img:after 
    {
        content: '';
        width: 100%;
        height: 30%;
        left: 0;
        bottom: 0;
        background: linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 80%);
        z-index: 5;
        position: absolute;
    }

    .desc 
    {
        padding: 25px 20px;
        display: flex;
        flex-direction: column;
        background: #fff;

        .name 
        {
            color: #354c55;
            font-weight: 800;
        }

        .lectors 
        {
            font-size: 13px;
            color: #949494;
            margin: 15px 0;
        }

        .btn-wrapper 
        {
            display: flex;

            button 
            {
                font-size: 13px;
                padding-left: 20px;
                padding-right: 20px;
                height: 30px;
                min-width: auto;
            }

            .btn 
            {
                margin-right: 10px;
            }
        }
    }
}

.course-card:hover .img img 
{
    transform: translate(-50%, -50%) scale(1.05);
}
</style>