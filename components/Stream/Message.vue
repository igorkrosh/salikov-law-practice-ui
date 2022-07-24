<template lang="pug">
.message(:class="Classes")
    .avatar(@click="$emit('delete-message', item.id)")
        img(v-if="item.avatar" :src="item.avatar", alt="")
        img(v-else src="/assets/images/avatar.jpg", alt="")
    .text-wrapper
        span.type(v-if="item.role == 'user'") {{item.username}}
        span.type(v-else) {{item.username}} ({{item.role}})
        span.text {{item.text}}
        span.date {{ConvertDate}}
</template>

<script>
export default {
    props: ['item', 'creatorId'],
    data() {
        return {
            role: '',
        }
    },
    computed: {
        Classes()
        {
            let classes = {};

            if (this.item.role != 'user')
            {
                classes['reverse'] = true
            }

            classes[this.item.role] = true

            return classes;
        },
        ConvertDate()
        {
            return new Date(this.item.date).toLocaleString('ru-RU');
        }
    },
    mounted()
    {

    }
}
</script>

<style>

</style>