<template lang="pug">
Modal(name="block-access-edit" height="auto" width="600" classes="dialog" :adaptive="true" :scrollable="true" @closed="ClearAccess" @before-open="GetUserAccess")
    .card.course-block
        .btn-modal-close(@click="CloseModal")
        h3 Редактировать участника <br> {{name}}
        h4(v-if="blocksList") Доступы к блокам курса:
        .radio-wrapper(v-for="item in blocksList")
            label.radio 
                |{{item.title}}
                input.checkbox(type="checkbox" :value="item.id" v-model="accessList")
                span.checkmark 
        .center 
            button.btn(@click="SetAccess") Подтвердить
</template>

<script>
export default {
    props: ['courseId', 'userId', 'name'],
    data() {
        return {
            access: null,
            accessList: [],
            blocksList: null,
        }
    },
    methods: {
        GetUserAccess()
        {
            this.$axios.$get(`/api/course/${this.courseId}/user/${this.userId}/access`)
            .then(response => {
                this.access = response;

                for (let item of this.access)
                {
                    this.accessList.push(item.id);
                }
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки доступов к блокам', text: error.response.data.message, type: 'error'})
            })
        },
        SetAccess()
        {
            this.$axios.$post(`/api/course/${this.courseId}/user/${this.userId}/set-access`, {
                access: this.accessList
            })
            .then(response => {
                this.$notify({title: 'Доступ обновлен', type: 'success'})
                this.CloseModal();
            })
            .catch(error => {
                this.$notify({title: 'Ошибка обновления доступов к блокам', text: error.response.data.message, type: 'error'})
            })
        },
        CloseModal()
        {
            this.$modal.hide('block-access-edit')
            this.ClearAccess();
        },
        ClearAccess()
        {
            this.access = null,
            this.accessList = []
        }
    },
    watch: {
        userId(value) {
            this.accessList = [];
            this.GetUserAccess();
        },
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

<style>

</style>