<template lang="pug">
.chat-wrapper(:class="{moderator: this.$store.getters.USER.role != 'user'}")
    .messages-wrapper
        PerfectScrollbar(@scroll="HandlerScroll" ref="chat")
            StreamMessage(v-for="(item, index) in messages" :item="item" :key="index" @delete-message="DeleteMessage")
    .input-wrapper(v-if="status != 'done'")
        input(v-model="newMessage")
        button.btn.blue.sm(@click="SendMessage") Отправить
    NuxtLink(:to='ChatLink' target="_blank").btn.sm.chat-window(v-if="this.$store.getters.USER.role != 'user'") Открыть чат в новом окне
</template>

<script>
export default {
    props: {
        moduleType: String,
        streamId: String,
        courseId: {
            type: String,
            default: '0'
        },
        status: {
            type: String,
            default: 'live',
        }
    },
    data() {
        return {
            messages: [],
            newMessage: '',
            sticky: true,
        }
    },
    methods: {
        SendMessage()
        {
            this.$axios.$post(`/api/chat/${this.moduleType}/${this.streamId}/message/send`, {
                text: this.newMessage
            })
            .then(response => {
                this.newMessage = '';
            })
            .catch(error => {
                this.$notify({title: 'Ошибка отправки сообщения', text: error.response.data.message, type: 'error'})
            })
        },
        LoadChat()
        {
            this.$axios.$get(`/api/chat/${this.moduleType}/${this.streamId}/message/get`)
            .then(response => {
                this.messages = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки чата', text: error.response.data.message, type: 'error'})
            })
        },
        HandlerScroll(event)
        {
            let scrollHeight = this.$refs.chat.$el.scrollHeight;
            let height = this.$refs.chat.$el.offsetHeight;
            let scrollTop = this.$refs.chat.$el.scrollTop;

            if (scrollTop == scrollHeight - height)
            {
                this.sticky = true;
            }
            else 
            {
                this.sticky = false;
            }
        },
        ScrollToDown()
        {
            if (!this.sticky)
            {
                return 
            }
            this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
        },
        DeleteMessage(messageId)
        {
            if (this.$store.getters.USER.role == 'user')
            {
                return;
            }

            this.$axios.$delete(`/api/chat/${this.moduleType}/${this.streamId}/message/${messageId}`)
            .then(response => {
                this.$notify({title: 'Сообщение удалено', text: '', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления сообщения', text: error.response.data.message, type: 'error'})
            })
        },
        
    },
    computed: {
        ChatLink() 
        {
            if (this.type = 'module')
            {
                return `/educator/course/${this.courseId}/stream/${this.streamId}/chat`
            }
            if (this.type = 'webinar')
            {
                return `/educator/webinar/${this.streamId}/chat`
            }
        }
    },
    watch: {
        messages() 
        {
            setTimeout(this.ScrollToDown, 300)
        }
    },
    mounted()
    {
        this.LoadChat();

        this.$echo.channel(`stream-chat-${this.moduleType}.${this.streamId}`)
        .listen('StreamChatUpdate', (e) => {
            console.log(e)
            this.messages.push(e);
        })
        .listen('StreamChatDeleteMessage', (e) => {
            console.log(e)
            for(let i = 0; i < this.messages.length; i++)
            { 
                if ( this.messages[i].id == e.messageId) 
                { 
                    this.messages.splice(i, 1);
                    break;
                }
            }
        })
    },
    destroyed()
    {
        this.$echo.leave(`stream-chat-${this.type}.${this.streamId}`)
    }
}
</script>

<style lang="scss">

</style>