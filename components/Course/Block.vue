<template lang="pug">
.card.course-bloks
    button.btn-modal-close(@click="$emit('delete-block', index)")
    b Блок №{{index}}
    .input-wrapper(:class="{error: block.errors.includes('title')}")
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
                .wrapper.arrows
                    button.btn.sm(@click="ModuleDown(index)") ▲
                    button.btn.sm.blue(@click="ModuleUp(index)") ▼
                .wrapper
                    button.btn.sm(@click="ConfigureModule(index)") Настроить
                    button.btn.sm.blue(@click="DropModule(index)") Сбросить
    .btn-wrapper
        button.btn(@click="AddModule('stream')") + Стрим-ссылка 
        button.btn(@click="AddModule('video')") + Видео-запись
        button.btn.blue(@click="AddModule('job')") + Задания
        button.btn.blue(@click="AddModule('test')") + Тесты
    ModalCourseBlockStream(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose" @drop-module="DropModule")
    ModalCourseBlockVideo(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose" @drop-module="DropModule")
    ModalCourseBlockJob(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose" @drop-module="DropModule")
    ModalCourseBlockTest(:blockId="index" v-model="block.modules[selectedIndex]" @modal-close="ModalClose" @drop-module="DropModule")
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
            if (this.block.modules[index]['id'] != undefined)
            {
                this.$emit('delete-module', this.block.modules[index]['id'], this.block.modules[index]['type'])
            }
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
            this.CalcModulesIndex()

            this.$modal.show(`course-block-${type}-${this.index}`);
        },
        ConfigureModule(index)
        {
            this.selectedIndex = index;
            this.$modal.show(`course-block-${this.block.modules[index].type}-${this.index}`);
        },
        CalcModulesIndex()
        {
            for (let index = 0; index < this.block.modules.length; index++)
            {
                this.block.modules[index].index = index;
            }
        },
        ModuleDown(index)
        {
            let toIndex = index - 1;

            if (toIndex < 0)
            {
                return;
            }
            
            let element = this.block.modules[index];
            this.block.modules.splice(index, 1);
            this.block.modules.splice(toIndex, 0, element);

            this.CalcModulesIndex()
        },
        ModuleUp(index)
        {
            let toIndex = index + 1;
            
            if (toIndex >= this.block.modules.length)
            {
                return;
            }

            let element = this.block.modules[index];
            this.block.modules.splice(index, 1);
            this.block.modules.splice(toIndex, 0, element);

            this.CalcModulesIndex()
        },
    },
    mounted() {
        this.index = this.count;
    }
}
</script>

<style>

</style>