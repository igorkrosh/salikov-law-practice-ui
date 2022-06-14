<template lang="pug">
.page-add-course 
    .block
        .card.course-name(:class="{error: errors.includes('name')}")
            span Название вебинар 
            textarea(v-model="webinar.name")
    .block 
        .couse-info 
            .input-wrapper(:class="{error: errors.includes('authors')}")
                label Авторы:
                input(placeholder="Иванов И.И." v-model="webinar.authors")
            DatePicker(label="Дата начала:" v-model="webinar.date_start")
            .input-wrapper(:class="{error: errors.includes('link')}")
                label Ссылка:
                input(placeholder="Иванов И.И." v-model="webinar.link")
            .input-wrapper(v-if="oldCover") 
                label Текущая обложка курса:
                .cover 
                    img(:src="oldCover")
            .input-wrapper 
                label(v-if="oldCover") Новая обложка вебинара:
                label(v-else) Обложка вебинара:
                ClientOnly
                    PictureInput(
                        ref="pictureInput" 
                        width="350" 
                        height="350" 
                        accept="image/jpeg,image/png" 
                        size="2" 
                        :custom-strings="{drag: 'Перетащите изображение или кликните по форме', change: 'Изменить фото', remove: 'Удалить фото', fileSize: 'Размер изображения не должен превышать 2 Мб'}"
                        button-class="btn blue sm"
                        removeButtonClass="btn blue sm"
                        :removable="true"
                        @change="PictireOnChange"
                    )
            .btn-wrapper
                button.btn(@click="SaveWebinar") Сохранить
            .btn-wrapper(v-if="webinar.id")
                button.btn.red(@click="$modal.show('webinar-delete')") Удалить
    ModalWebinarDelete(@delete-webinar="DeleteWebinar")
            
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
            errors: [],
            webinar: {
                name: '',
                authors: '',
                date_start: new Date(),
                image: '',
                link: '',
            },
            oldCover: null
        }
    },
    methods: {
        PictireOnChange(image) 
        {
            if (image)
            {
                this.webinar.image = image;
            }
        },
        SaveWebinar()
        {
            if (this.CheckWebinar())
            {
                this.$emit('save-webinar', this.webinar)
            }
            else 
            {
                this.$notify({title: 'Ошибка формы вебинара', text: 'Проверте правильность заполнения полей', type: 'error'})
            }
        },
        CheckWebinar()
        {
            this.errors = [];

            if (this.webinar.name == '')
            {
                this.errors.push('name')
            }

            if (this.webinar.authors == '')
            {
                this.errors.push('authors')
            }

            if (this.webinar.link == '')
            {
                this.errors.push('link')
            }

            if (this.errors.length > 0)
            {
                return false;
            }

            return true;
        },
        CheckEnterData()
        {
            if (this.enterData.id != undefined)
            {
                this.webinar = Object.assign({}, this.enterData);
                this.oldCover = this.webinar.image;
                this.webinar.image = '';
            }
        },
        DeleteWebinar()
        {
            this.$axios.$delete(`/api/webinar/${this.webinar.id}/delete`)
            .then(response => {
                this.$notify({title: 'Успешно', text: 'Вебинар удален', type: 'success'})
                this.$router.push('/webinars')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления вебинара', text: error.response.data.message, type: 'error'});
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
    }
}
</script>

<style>

</style>