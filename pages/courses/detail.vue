<template lang="pug">
.col-wrapper.page-course-detail
    .col.first
        h2 Курс: Охрана исключительных прав IT-компаний: программное обеспечение и товарные знаки
        .course-info 
            span Приобретен: 16.02.2022
            span Продолжительность: 72 ак. ч.
            span Уроки: 37
        h3 Модули курса:
        CourseModule(:module="modules[0]")
        CourseModule(:module="modules[1]")
    ProfileColumnCourse
</template>

<script>
export default {
    data() {
        return {
            modules: [
                {
                    count: 'Модуль 1.',
                    title: 'Актуальные занятия',
                    data: [
                        {
                            icon: 'check',
                            date: '17.05.2022,  19:00',
                            title: 'Python. Знакомство с консолью',
                            educator: 'Иванов И.И.',
                            type: 'webinar'
                        },
                        {
                            icon: 'check',
                            date: '17.05.2022,  19:00',
                            title: 'Python. Знакомство с консолью',
                            educator: 'Иванов И.И.',
                            type: 'webinar'
                        },
                        {
                            icon: 'none',
                            date: '17.05.2022,  19:00',
                            title: 'Python. Знакомство с консолью',
                            educator: 'Иванов И.И.',
                            type: 'webinar'
                        }
                    ]
                },
                {
                    count: 'Модуль 2.',
                    title: 'Домашние задания',
                    data: [
                        {
                            icon: 'check',
                            date: '17.05.2022,  19:00',
                            title: 'Антимонопольный контроль в сфере экономической концентрации',
                            educator: 'Иванов И.И.',
                            type: 'homework',
                            link: '/courses/homework'
                        },
                        {
                            icon: 'close',
                            date: '17.05.2022,  19:00',
                            title: 'Введение в типы данных и циклы',
                            educator: 'Иванов И.И.',
                            type: 'test',
                            link: '/courses/result'
                        },
                        {
                            icon: 'done',
                            date: '17.05.2022,  19:00',
                            title: 'Python. Знакомство с консолью',
                            educator: 'Иванов И.И.',
                            type: 'test',
                            link: '/courses/result'
                        },
                        {
                            icon: 'none',
                            date: '17.05.2022,  19:00',
                            title: 'Python. Знакомство с консолью',
                            educator: 'Иванов И.И.',
                            type: 'test',
                            link: '/courses/test'
                        }
                    ]
                }
            ]
        }
    },
    mounted() 
    {
        this.$store.dispatch('SET_PAGETITLE', 'Детали курса')
    }
}
</script>

<style lang="scss">
.page-course-detail
{
    h2 
    {
        margin-top: 0;
    }

    .course-info 
    {
        display: flex;
        margin-bottom: 40px;

        span 
        {
            font-size: 13px;
            margin-right: 40px;
        }
    }

    h3 
    {
        font-weight: 700;
    }

    .course-dropdown
    {
        width: 100%;
        background: #fff;
        border-radius: 15px;
        box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.1);
        margin-bottom: 20px;

        .course-header.border-bottom:not(.active):after
        {
            background: #fff;
        }

        .course-header.active 
        {
            img 
            {
                transform: rotate(90deg);
            }
        }

        .course-header
        {
            display: flex;
            align-items: center;
            padding: 20px;
            cursor: pointer;

            img 
            {
                margin-right: 15px;
                transition: 0.3s;
            }

            b 
            {
                margin-right: 5px;
                color: #354c55;
            }

            span 
            {
                font-weight: 700;
            }
        }

        .course-wrapper 
        {
            height: 0;
            overflow: hidden;
            transition: 0.3s;
        }
    }

    .detail 
    {
        .item 
        {
            padding: 20px;
            padding-left: 70px;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .link 
            {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }

            .info 
            {
                display: flex;
                flex-direction: column;
                max-width: 65%;

                .date 
                {
                    padding-left: 30px;
                    font-size: 13px;
                    color: #747474;
                    position: relative;
                }

                .date:after 
                {
                    content: '';
                    width: 19px;
                    height: 17px;
                    background: url(/assets/images/icons/deadline3.png);
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }

                .course-title 
                {
                    font-size: 15px;
                    margin: 5px 0;
                }

                .name 
                {
                    font-size: 13px;
                    color: #747474;
                }
            }

            .type.webinar
            {
                background: #354c55;
                color: #fff;
            }

            .type.record 
            {
                background: #80a6b4;
                color: #fff;
            }

            .type.homework 
            {
                background: #e9a568;
                color: #000;
            }

            .type.test 
            {
                background: #fdf6ef;
                color: #000;
            }

            .type
            {
                padding: 3px 15px;
                border-radius: 15px;
                font-size: 14px;
            }
        }

        .item:before 
        {
            content: '';
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            margin: auto;
        }

        .item.check:before 
        {
            width: 29px;
            height: 29px;
            background: url(/assets/images/icons/check.png);
        }

        .item.close:before 
        {
            width: 19px;
            height: 19px;
            background: url(/assets/images/icons/close.png);
            left: 25px;
        }

        .item.done:before 
        {
            width: 22px;
            height: 16px;
            background: url(/assets/images/icons/done.png);
            left: 25px;
        }
    }

    .border-bottom
    {
        position: relative;
        transition: 0.3s;
    }

    .border-bottom:last-child:after
    {
        content: none;
    }

    .border-bottom:after 
    {
        content: '';
        width: calc(100% - 40px);
        height: 1px;
        background: #dddddd;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }


}
</style>