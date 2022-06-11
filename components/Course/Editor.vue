<template lang="pug">
.page-add-course 
    .block
        .card.course-name(:class="{error: errors.includes('name')}")
            span Название курса 
            textarea(v-model="course.name")
    .block 
        h2 Блоки курса 
        CourseBlock(v-for="(item, index) in course.blocks" :key="index" :count="index + 1" :block="item" @delete-module="DeleteModule" @delete-block="DeteleBlock")
        .add-block
            button.btn.blue(@click="AddBlock") Добавить блок
        .couse-info 
            .input-wrapper(:class="{error: errors.includes('authors')}")
                label Авторы:
                input(placeholder="Иванов И.И." v-model="course.authors")
            DatePicker(label="Дата начала:" v-model="course.date_start")
            .input-wrapper(:class="{error: errors.includes('duration')}")
                label Продолжительность:
                input(placeholder="2 недели" v-model="course.duration")
            .input-wrapper(v-if="oldCover") 
                label Текущая обложка курса:
                .cover 
                    img(:src="oldCover")
            .input-wrapper 
                label(v-if="oldCover") Новая обложка курса:
                label(v-else) Обложка курса:
                ClientOnly
                    PictureInput(
                        ref="pictureInput" 
                        width="350" 
                        height="350" 
                        accept="image/jpeg,image/png" 
                        size="10" 
                        :custom-strings="{drag: 'Перетащите изображение или кликните по форме', change: 'Изменить фото', remove: 'Удалить фото'}"
                        button-class="btn blue sm"
                        removeButtonClass="btn blue sm"
                        :removable="true"
                        @change="PictireOnChange"
                    )
            .btn-wrapper
                button.btn(@click="SaveCourse") Сохранить
</template>

<script>
export default {
    props: {
        enterData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            course: {
                name: '',
                authors: '',
                date_start: new Date(),
                duration: '',
                image: '',
                blocks: [
                    {
                        title: '',
                        date: new Date(),
                        index: 1,
                        modules: [],
                        errors: [],
                    }
                ]
            },
            oldCover: '',
            errors: []
        }
    },
    methods: {
        PictireOnChange(image) 
        {
            if (image)
            {
                this.course.image = image;
            }
        },
        
        AddBlock()
        {
            let index = this.course.blocks.length;
            this.course.blocks.push({
                title: '',
                index: index,
                date: new Date(),
                modules: [],
                errors: [],
            })
        },
        SaveCourse()
        {
            if (this.CheckCourse())
            {
                this.$emit('save-course', this.course);
            }
        },
        CheckEnterData()
        {
            if (this.enterData.id != undefined)
            {
                this.course = Object.assign({}, this.enterData);
                this.course.deleted = {
                    'stream': [],
                    'video': [],
                    'job': [],
                    'test': [],
                }
                this.oldCover = this.course.image;
                this.course.image = '';
            }
        },
        DeleteModule(moduleID, type)
        {
            this.course.deleted[type].push(moduleID);
        },
        DeteleBlock(blockID)
        {
            console.log(blockID)
            this.course.blocks.splice(blockID - 1, 1);
        },
        CheckCourse()
        {
            this.errors = [];

            for (let block of this.course.blocks)
            {
                block.errors = [];
            }
            
            if (this.course.name == '')
            {
                this.errors.push('name');
            }

            if (this.course.authors == '')
            {
                this.errors.push('authors');
            }

            if (this.course.duration == '')
            {
                this.errors.push('duration');
            }

            let check = true;

            for (let block of this.course.blocks)
            {
                if (block.title == '')
                {
                    block.errors.push('title');
                    check = false;
                }
            }

            if (this.errors.length > 0 || !check)
            {
                this.$notify({title: 'Ошибка формы курса', text: 'Проверте правильность заполнения полей', type: 'error'})
                return false;
            }

            return true;
        }
    },
    watch: {
        enterData()
        {
            this.CheckEnterData();
        }
    },
    mounted() 
    {
        this.CheckEnterData();
    }
}
</script>

<style>

</style>