<template lang="pug">
.chat-wrapper(:class="{moderator: this.$store.getters.USER.role != 'user'}")
    .messages-wrapper
        PerfectScrollbar(@scroll="HandlerScroll" ref="chat")
            StreamMessage(v-for="(item, index) in messages" :item="item" :key="index" @delete-message="DeleteMessage")
    .input-wrapper
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

            this.$axios.$delete(`/api/chat/${this.type}/${this.streamId}/message/${messageId}`)
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
.stream-page
{
    .card
    {
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
    }

    .player-wrapper
    {
        border-radius: 10px;
        overflow: hidden;
        width: 70%;
        height: 550px;
    }

    .chat-window
    {
        display: none;
        text-align: center;
    }

    .chat-wrapper.moderator 
    {
        .avatar
        {
            position: relative;
            cursor: pointer;

            img 
            {
                transition: 0.3s;
            }
        }

        .chat-window
        {
            display: block;
        }

        .avatar:hover:after, .avatar:hover:before
        {
            opacity: 1;
        }

        .avatar:hover
        {
            img
            {
                opacity: 0.5;
                filter: blur(1px);
            }
        }

        .avatar:after, .avatar:before
        {
            content: '';
            width: 17px;
            height: 2px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            background: red;
            z-index: 3;
            opacity: 0;
            transition: 0.3s;
        }

        .avatar:after
        {
            transform: rotate(45deg);
        }

        .avatar:before
        {
            transform: rotate(-45deg);
        }
    }
    .chat-wrapper 
    {
        width: 29%;
        margin-left: auto;
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .ps 
        {
            height: 420px;
        }

        .input-wrapper
        {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            margin: 0;

            input 
            {
                width: 70%;
                border: 1px solid #ededed;
                border-radius: 10px;
            }

            button 
            {
                width: 28%;
                margin-left: auto;
            }
        }

        .messages-wrapper
        {
            border: 1px solid #ededed;
            border-radius: 10px;
            padding: 15px 0 15px 15px;

            .message.admin 
            {
                .text-wrapper 
                {
                    border: 1px solid #E54D42;

                    .type 
                    {
                        color: #E54D42;
                    }
                }
            }

            .message.moderator
            {
                .text-wrapper 
                {
                    border: 1px solid #f48a06;

                    .type 
                    {
                        color: #f48a06;
                    }
                }
            }

            .message.reverse
            {
                flex-direction: row-reverse;

                .avatar 
                {
                    margin-right: 0px;
                    margin-left: 10px;
                }
            }

            .message 
            {
                display: flex;
                margin-top: 7px;
                align-items: flex-start;
                padding-right: 15px;

                .type 
                {
                    font-size: 11px;
                    margin-bottom: 2px;
                }
                .avatar
                {
                    margin-right: 10px;
                }
                .avatar img
                {
                    max-width: 30px;
                    max-height: 30px;
                    border-radius: 50%;
                }

                .text-wrapper 
                {
                    border: 1px solid #ededed;
                    border-radius: 10px;
                    padding: 7px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    .text 
                    {
                        font-size: 13px;
                        margin-bottom: 2px;
                    }

                    .date 
                    {
                        font-size: 11px;
                        color: #aaa;
                        margin-left: auto;
                    }
                }
            }
        }
    }
}
</style>