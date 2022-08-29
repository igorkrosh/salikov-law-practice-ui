<template lang="pug">
.col-wrapper.page-edit
    .col.first
        .card.callback.ticket.block
            h2 Создать чат
            .input-wrapper 
                label Тема обращения
                input(v-model="ticket.title")
            p Сообщение:
            TextEditor.editor(v-model="ticket.text")
            .file-wrapper
                InputFile(v-model="file" name="ticket-file")
            .btn-wrapper 
                button.btn(@click="CreateTicket") Отправить
                
    ProfileColumnInfo
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            ticket: {
                title: '',
                text: '',
            },
            file: null,
        }
    },
    methods: {
        CreateTicket()
        {
            let formData = new FormData()
            formData.append("ticket", JSON.stringify(this.ticket));
            formData.append('file', this.file)

            this.$axios.$post('/api/ticket/create', formData)
            .then(response => {
                this.$notify({title: 'Чат создан', text: 'Спасибо за обращение!', type: 'success'})
                this.$router.push('/callback')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка создания чата', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Обратная связь')
    }
}
</script>

<style lang="scss">
.card.callback.ticket
{
    padding: 25px;

    p 
    {
        width: 100%;
    }

    .editor 
    {
        width: 100%;
    }

    .input-wrapper 
    {
        width: 100%;
        margin-bottom: 0;
    }

    .file-wrapper 
    {
        width: 100%;
        align-items: flex-end;
    }
}
</style>