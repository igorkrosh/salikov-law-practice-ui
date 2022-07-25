<template lang="pug">
.page-test.stream-page.chat-page
    .card(v-if="moduleId")
        StreamChat(moduleType="module" :streamId="moduleId")
</template>

<script>
export default {
    middleware: "auth",
    layout: 'chat',
    data() {
        return {
            moduleId: null,
        }
    },
    mounted() 
    {
        this.moduleId = this.$route.params.id;
    },
}
</script>

<style lang="scss">
.chat-page
{
    .card 
    {
        height: 75vh;
    }

    .messages-wrapper
    {
        height: 85%;
    }

    .chat-wrapper
    {
        width: 100%;

        .ps 
        {
            height: 100%;
        }
    }

    .chat-wrapper.moderator .chat-window 
    {
        display: none;
    }
}
</style>