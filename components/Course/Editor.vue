<template lang="pug">
.page
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
                input(placeholder="" v-model="course.authors")
            DatePicker(label="Дата начала:" v-model="course.date_start")
            .input-wrapper(:class="{error: errors.includes('duration')}")
                label Продолжительность:
                input(placeholder="" v-model="course.duration")
            .input-wrapper(:class="{error: errors.includes('hours')}")
                label Количество академических часов:
                input(placeholder="" v-model="course.hours" type="number")
            .select-wrapper(:class="{error: errors.includes('category')}")
                label Категория:
                select(placeholder="" v-model="course.category")
                    option(v-for="category in categories" :value="category") {{category}}
            .select-wrapper(:class="{error: errors.includes('status')}" v-if="$store.getters.USER.role == 'admin' || $store.getters.USER.role == 'moderator'")
                label Статус публикации: 
                select(placeholder="" v-model="course.status")
                    option(value="edit") Необходима проверка
                    option(value="check") На проверке
                    option(value="verified") Проверен
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
                        :custom-strings="{drag: 'Перетащите изображение или кликните по форме', change: 'Изменить фото', remove: 'Удалить фото', fileSize: 'Размер изображения не должен превышать 2 Мб'}"
                        button-class="btn blue sm"
                        removeButtonClass="btn blue sm"
                        :removable="true"
                        @change="PictireOnChange"
                    )
            .btn-wrapper
                button.btn(@click="SaveCourse") Сохранить
            .btn-wrapper(v-if="course.id")
                button.btn.red(@click="$modal.show('course-delete')") Удалить
            br
            .btn-wrapper(v-if="course.id && $store.getters.USER.role != 'admin' && $store.getters.USER.role != 'moderator' && course.status == 'edit'")
                button.btn.blue(@click="$modal.show('course-delete')") Отправить на проверку
    ModalCourseDelete(@delete-course="DeleteCourse")
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
                hours: '',
                category: '',
                status: 'edit',
                blocks: [
                    {
                        title: '',
                        date: new Date(),
                        index: 0,
                        modules: [],
                        errors: [],
                    }
                ]
            },
            oldCover: '',
            cover: null,
            errors: [],
            files: [],
            categories: []
        }
    },
    methods: {
        PictireOnChange(image) 
        {
            this.cover = this.$refs.pictureInput.$el.querySelector('input[type=file]').files[0]
        },
        ModerateCourse()
        {
            this.course.status = 'check'
            this.SaveCourse()
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
                this.$emit('save-course', this.course, this.cover, this.files);
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
                    'block': [],
                }
                for (let block of this.course.blocks)
                {
                    block.errors = [];
                }
                this.oldCover = this.course.image;
                this.course.image = '';
            }
        },
        DeleteModule(moduleID, type)
        {
            this.course.deleted[type].push(moduleID);
        },
        DeteleBlock(index, id)
        {
            console.log(index)
            this.course.blocks.splice(index, 1);

            if (id != undefined)
            {
                this.course.deleted['block'].push(id);
            }
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

            if (this.course.hours == '')
            {
                this.errors.push('hours');
            }

            if (this.course.category == '')
            {
                this.errors.push('category');
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
        },
        DeleteCourse()
        {
            this.$axios.$delete(`/api/course/${this.course.id}/delete`)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Курс удален', type: 'success'})
                this.$router.push('/dashboard')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления курса', text: error.response.data.message, type: 'error'});
            })
        },
        LoadCategories()
        {
            this.$axios.$get(`/api/course/categories`)
            .then(response => {
                this.categories = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки категорий', text: error.response.data.message, type: 'error'})
            })
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
        this.LoadCategories();
    }
}
</script>

<style>

</style>