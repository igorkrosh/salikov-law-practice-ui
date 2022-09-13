<template lang="pug">
Modal(name="block-access" height="auto" width="600" classes="dialog" :adaptive="true" :scrollable="true" @closed="ClearAccess")
    .card.course-block
        .btn-modal-close(@click="CloseModal")
        h3 Добавить участника
        .input-wrapper
            label Email:
            input(placeholder="user@user.com" v-model="access.email")
        h4 Доступ к курсу: 
        .radio-wrapper
            label.radio Неограниченный доступ
                input.checkbox(type="checkbox" v-model="access.unlimited")
                span.checkmark 
        .input-wrapper(:class="{disable: access.unlimited}")
            DatePicker(label="Дата окончания доступа:" v-model="access.access_date")
        h4(v-if="blocksList") Доступы к блокам курса:
        .radio-wrapper(v-for="item in blocksList")
            label.radio 
                |{{item.title}}
                input.checkbox(type="checkbox" :value="item.id" v-model="access.blocks")
                span.checkmark 
        .center 
            button.btn(@click="SetAccess") Подтвердить
</template>

<script>
export default {
    props: ['courseId'],
    data() {
        return {
            access: {
                email: '',
                course_id: this.courseId,
                blocks: [],
                access_date: new Date(),
                unlimited: false,
            },
            blocksList: null
        }
    },
    methods: {
        CloseModal()
        {
            this.ClearAccess();
            this.$modal.hide('block-access')
        },
        ClearAccess()
        {
            this.access = {
                email: '',
                course_id: this.courseId,
                blocks: [],
            }
        },
        SetAccess()
        {
            this.$axios.$post(`/api/course/${this.courseId}/set-access`, this.access)
            .then(response => {
                this.$notify({title: 'Участник добавлен', type: 'success'})
                this.CloseModal();
                this.$emit('load-users')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка добавления участника', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted()
    {
        this.$axios.$get(`/api/course/${this.courseId}/blocks`)
        .then(response => {
            this.blocksList = response;
        })
        .catch(error => {
            this.$notify({title: 'Ошибка загрузки блоков', text: error.response.data.message, type: 'error'})
        })
    }
}
</script>

<style lang="scss">
.course-block
{
    h4 
    {
        text-align: left;
        width: 100%;
        font-size: 14px;
    }

    .radio-wrapper 
    {
        width: 100%;

        label 
        {
            font-weight: 400;
        }
    }
}
</style>