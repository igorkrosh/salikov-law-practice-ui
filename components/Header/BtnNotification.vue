<template lang="pug">
.notification(:class="{active: active}" @click="open = !open")
    .notification-wrapper(:class="{active: open}" v-if="$store.getters.NOTIFICATIONS.length > 0")
        .item(v-for="item in $store.getters.NOTIFICATIONS")
            .text-wrapper 
                .item-title {{item.title}} 
                .item-text {{item.text}}
            button.close(@click.stop="DeleteNotification(item.id)")
        button.btn.clear-all(@click.stop="DeleteAllNotification") Прочитать все
</template>

<script>
export default {
    data() {
        return {
            active: false,
            open: false,
        }
    },
    methods: {
        DeleteNotification(id)
        {
            this.$axios.$delete(`/api/notification/${id}/delete`)
            .then(response => {
                this.$store.dispatch('LOAD_NOTIFICATIONS')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления уведомления', text: error.response.data.message, type: 'error'});
            })
        },
        DeleteAllNotification()
        {
            this.$axios.$delete(`/api/notification/delete/all`)
            .then(response => {
                this.$store.dispatch('LOAD_NOTIFICATIONS')
            })
            .catch(error => {
                this.$notify({title: 'Ошибка удаления уведомления', text: error.response.data.message, type: 'error'});
            })
        }
    },
    watch: {
        '$store.getters.NOTIFICATIONS': function () {
            if (this.$store.getters.NOTIFICATIONS.length > 0)
            {
                this.active = true;
            }
            else 
            {
                this.active = false;
                this.open = false;
            }
        }
    },
    mounted()
    {
        this.$store.dispatch('LOAD_NOTIFICATIONS')
    }
    
}
</script>

<style lang="scss">
.notification-wrapper.active 
{
    opacity: 1;
    pointer-events: none;

    .close 
    {
        pointer-events: all;
    }
}

.notification-wrapper
{
    position: absolute;
    width: 300px;
    right: 0;
    top: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.3);
    background: #fff;
    padding: 15px;
    transition: 0.3s;
    opacity: 0;
    pointer-events: none;

    .item 
    {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px 15px;
        border-radius: 10px;
        border: 1px solid #dbdbdb;
        margin-bottom: 10px;

        .text-wrapper 
        {
            width: 80%;
            text-align: left;

            .item-title 
            {
                font-size: 14px;
                font-weight: 600;
            }

            .item-text 
            {
                font-size: 13px;
            }

            .item-date
            {
                font-size: 12px;
            }
        }

        .close 
        {
            width: 27px;
            height: 27px;
            border-radius: 50%;
            border: none;
            position: relative;
            background: #80a6b4;
            opacity: 0.7;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
            transition: 0.3s;
        }

        .close:after, .close:before 
        {
            content: '';
            width: 17px;
            height: 2px;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #fff;
        }

        .close:after 
        {
            transform: rotate(45deg);
        }

        .close:before 
        {
            transform: rotate(-45deg);
        }

        .close:hover 
        {
            opacity: 1;
        }
    }

    .clear-all
    {
        width: 100%;
        margin-top: 10px;
        pointer-events: all;
    }
    
}
</style>