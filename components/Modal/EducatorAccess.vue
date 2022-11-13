<template lang="pug">
Modal(name="educator-access" height="auto" width="600" classes="dialog" :adaptive="true" :scrollable="true" @closed="ClearAccess")
    .card.course-block
        .btn-modal-close(@click="CloseModal")
        h3 Добавить преподавателя
        .input-wrapper
            label Email:
            input(placeholder="user@user.com" v-model="email")
        .center 
            button.btn(@click="SetAccess") Подтвердить
</template>

<script>
export default {
    props: ['courseId'],
    data() {
        return {
            email: '',

        }
    },
    methods: {
        CloseModal()
        {
            this.ClearAccess();
            this.$modal.hide('educator-access')
        },
        ClearAccess()
        {
            this.email = '';
        },
        SetAccess()
        {
            this.$axios.$post(`/api/course/${this.courseId}/educators/add`, {
                email: this.email
            })
            .then(response => {
                this.$notify({title: 'Преподаватель добавлен', type: 'success'})
                this.CloseModal();
                this.$emit('load-users')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка добавления преподавателя', text: error.response.data.message, type: 'error'})
            })
        }
    }
}
</script>