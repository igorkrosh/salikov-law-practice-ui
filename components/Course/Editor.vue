<template lang="pug">
.page-add-course 
    .block
        .card.course-name 
            span Название курса 
            textarea(v-model="course.name")
    .block 
        h2 Блоки курса 
        CourseBlock(v-for="(item, index) in course.blocks" :key="index" :count="index + 1" :block="item")
        .add-block
            button.btn.blue(@click="AddBlock") Добавить блок
        .couse-info 
            .input-wrapper 
                label Авторы:
                input(placeholder="Иванов И.И." v-model="course.authors")
            .input-wrapper 
                label Дата начала:
                input(placeholder="04.05.2022" v-model="course.date_start" v-maska="'##.##.####'")
            .input-wrapper 
                label Продолжительность:
                input(placeholder="2 недели" v-model="course.duration")
            .input-wrapper 
                label Обложка курса:
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
    data() {
        return {
            course: {
                name: '',
                authors: '',
                date_start: '',
                duration: '',
                image: '',
                blocks: [
                    {
                        title: '',
                        date: '',
                        index: 1,
                        modules: []
                    }
                ]
            },
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
            this.count++;
            this.course.blocks.push({
                title: '',
                date: '',
                modules: []
            })
        },
        SaveCourse()
        {
            this.$emit('save-course', this.course);
        }
    },
}
</script>

<style>

</style>