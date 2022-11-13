<template lang="pug">
.col-wrapper
    .col.first
        .card.chat.block(v-if="data")
            .ticket-message.author
                .user
                    img(v-if="data.ticket.avatar" :src="data.ticket.avatar", alt="").avatar
                    img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                .text-wrapper
                    .username {{data.ticket.username}}
                    .text(v-html="data.ticket.text")
                    .date {{ConvertDate(data.ticket.date)}}
                    .file-wrapper(v-if="data.ticket.file")
                        a(:href="data.ticket.file").link Скачать файл
            .ticket-message(v-for="(item, index) in data.messages" :key="index" :class="{author: item.user_id == data.ticket.user_id}")
                .user
                    img(v-if="item.avatar" :src="item.avatar", alt="").avatar
                    img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                .text-wrapper
                    .username {{item.username}}
                    .text(v-html="item.text")
                    .row
                        .date {{ConvertDate(item.date)}}
                        button.link.red(@click="DeleteMessage(item.id)") Удалить
                    .file-wrapper(v-if="item.file")
                        a(:href="item.file").link Скачать файл
            .answer-wrapper 
                TextEditor(v-model="answer").editor
                .btn-wrapper 
                    InputFile(v-model="file" name="message-file")
                    button.btn.sm(@click="SendMessage") Отправить
            .ticket-status 
                label Статус запроса
                .select-wrapper 
                    select(v-model="status")
                        option(value="new") В работе 
                        option(value="done") Закрыт
                button.btn.sm(@click="SetTicketStatus") Сохранить
                    
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            ticketId: 0,
            data: null,
            answer: '',
            file: null,
            status: '',
        }
    },
    methods:
    {
        ConvertDate(date)
        {
            return new Date(date).toLocaleString('ru-RU');
        },
        LoadChat()
        {
            this.$axios.$get(`/api/ticket/${this.ticketId}/chat `)
            .then(response => {
                this.data = response;
                this.$store.dispatch('SET_PAGETITLE', response.ticket.title);
                this.answer = '';
                this.file = null;
                this.status = response.ticket.status
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки чата', text: error.response.data.message, type: 'error'})
            })
        },
        SendMessage()
        {
            let formData = new FormData()
            formData.append("message", JSON.stringify({text: this.answer}));
            formData.append('file', this.file)

            this.$axios.$post(`/api/ticket/${this.ticketId}/chat/message`, formData)
            .then(response => {
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки сообщения', text: error.response.data.message, type: 'error'})
            })
        },
        ConnectChannel()
        {
            this.$echo.channel(`chat-notification.${this.ticketId}`)
            .listen('ChatUpdate', (e) => {
                this.LoadChat()
            })
        },
        DeleteMessage(messageId)
        {
            this.$axios.$delete(`/api/ticket/message/${messageId}`)
            .then(response => {
                this.$notify({title: 'Сообщение удалено', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления сообщения', text: error.response.data.message, type: 'error'})
            })
        },
        SetTicketStatus()
        {
            this.$axios.$post(`/api/ticket/${this.ticketId}/status`, {
                status: this.status
            })
            .then(response => {
                this.$notify({title: 'Статус запроса обновлен', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка обновления статуса', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted()
    {
        this.ticketId = this.$route.params.id;

        this.LoadChat()
        this.ConnectChannel()
    }
}
</script>

<style lang="scss">

</style>