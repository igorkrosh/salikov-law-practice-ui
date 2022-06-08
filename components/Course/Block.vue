<template lang="pug">
.card.course-bloks
    b Блок №{{index}}
    .input-wrapper 
        label Название блока
        input(v-model="block.title")
    .date-row 
        .wrapper
            DatePicker(label="Дата проведения" v-model="block.date")
    .module-wrapper(v-for="(item, index) in block.modules" :key="index")
        .options(v-if="item.type")
            b Урок №{{index + 1}}: {{item.title}}
            .input-wrapper 
                label(v-if="item.type == 'stream'") Тип: Стрим-ссылка 
                label(v-if="item.type == 'video'") Тип: Видео-запись
                label(v-if="item.type == 'job'") Тип: Задания
                label(v-if="item.type == 'test'") Тип: Тесты
            .btn-wrapper 
                button.btn.sm(@click="ConfigureModule(index)") Настроить
                button.btn.sm.blue(@click="DropModule(index)") Сбросить
    .btn-wrapper
        button.btn(@click="AddModule('stream')") + Стрим-ссылка 
        button.btn(@click="AddModule('video')") + Видео-запись
        button.btn.blue(@click="AddModule('job')") + Задания
        button.btn.blue(@click="AddModule('test')") + Тесты
    ModalCourseBlockStream(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose")
    ModalCourseBlockVideo(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose")
    ModalCourseBlockJob(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose")
    ModalCourseBlockTest(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose")
</template>

<script>
export default {
    props: ['count', 'block'],
    data() {
        return {
            index: 0,
            selectedIndex: 0,
        }
    },
    methods: {
        ModalShow(modalName) 
        {
            this.$modal.show(modalName);
        },
        ModalClose(modalName)
        {
            this.$modal.hide(modalName);
        },
        SaveModule(index, options)
        {
            this.type = type;
            this.$emit('save-module', index, options);
        },
        DropModule(index)
        {
            this.block.modules.splice(index, 1);
        },
        AddModule(type)
        {
            if (type == 'stream')
            {
                this.block.modules.push({
                    type: 'stream',
                    authors: '',
                    title: '',
                    link: '',
                    date: new Date(),
                })
            }

            if (type == 'video')
            {
                this.block.modules.push({
                    type: 'video',
                    authors: '',
                    title: '',
                    link: '',
                })
            }

            if (type == 'job')
            {
                this.block.modules.push({
                    type: 'job',
                    authors: '',
                    title: '',
                    text: '',
                    deadline: new Date(),
                    check_date: new Date(),
                })
            }

            if (type == 'test')
            {
                this.block.modules.push({
                    type: 'test',
                    authors: '',
                    title: '',
                    text: '',
                    deadline: new Date(),
                    check_date: new Date(),
                    test: [
                        {
                            question: '',
                            answer: [
                                {
                                    text: '',
                                    corrent: false,
                                    comment: '',
                                }
                            ]
                        }
                    ]
                })
            }
            

            this.selectedIndex = this.block.modules.length - 1;

            this.$modal.show(`course-block-${type}-${this.index}`);
        },
        ConfigureModule(index)
        {
            this.selectedIndex = index;
            this.$modal.show(`course-block-${this.block.modules[index].type}-${this.index}`);
        }
    },
    mounted() {
        this.index = this.count;
    }
}
</script>

<style>

</style>