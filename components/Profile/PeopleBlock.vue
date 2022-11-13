<template lang="pug">
.block-wrapper(v-if="users")
    .people.block(v-if="users.curators.length > 0")
        .title-wrapper
            h2 Автор 
            //button.btn.blue.sm Добавить
        .wrapper
            .item(v-for="item in users.curators")
                img(v-if="item.image" :src="item.image", alt="")
                img(v-else src="/assets/images/avatar.jpg", alt="")
                span {{item.name}}
    .people.block
        .title-wrapper
            h2 Преподаватели
            button.btn.blue.sm(@click="$modal.show('educator-access')" v-if="this.$store.getters.USER.role != 'user'") Добавить
        .wrapper
            .item(v-for="item in users.educators")
                img(v-if="item.image" :src="item.image", alt="")
                img(v-else src="/assets/images/avatar.jpg", alt="")
                span {{item.name}}
        .wrapper
    .people.block 
        .title-wrapper
            h2 Однокурсники
            button.btn.blue.sm(@click="$modal.show('block-access')" v-if="this.$store.getters.USER.role != 'user'") Добавить
        .wrapper.hover(v-if="this.$store.getters.USER.role != 'user'")
            .item(v-for="item in users.users" @click="ShowModalAccessEdit(item.id, item.name)")
                img(v-if="item.image" :src="item.image", alt="")
                img(v-else src="/assets/images/avatar.jpg", alt="")
                span {{item.name}}
        .wrapper(v-else)
            .item(v-for="item in users.users")
                img(v-if="item.image" :src="item.image", alt="")
                img(v-else src="/assets/images/avatar.jpg", alt="")
                span {{item.name}}
    ModalBlockAccess(v-if="this.$store.getters.USER.role != 'user'" :courseId="courseId" @load-users="LoadUsers")
    ModalBlockAccessEdit(v-if="this.$store.getters.USER.role != 'user'" :courseId="courseId" :userId="userId" :name="name")
    ModalEducatorAccess(v-if="this.$store.getters.USER.role != 'user'" :courseId="courseId" @load-users="LoadUsers")
</template>

<script>
export default {
    data() {
        return {
            users: null,
            courseId: 0,
            userId: 0,
            name: '',
        }
    },
    methods: {
        LoadUsers()
        {
            this.$axios.$get(`/api/course/${this.courseId}/users`)
            .then(response => {
                this.users = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки пользователей', text: error.response.data.message, type: 'error'})
            })
        },
        ShowModalAccessEdit(id, name)
        {
            this.userId = id;
            this.name = name;
            this.$modal.show('block-access-edit');
        }
    },
    mounted()
    {
        this.courseId = this.$route.params.id;
        this.LoadUsers();
    }
}
</script>

<style lang="scss">
.block-wrapper .people.block
{
    .hover 
    {
        .item 
        {
            cursor: pointer;
            transition: 0.3s;
            border-radius: 10px;
        }
        .item:hover
        {
            background: #ededed;
        }
    }

    .wrapper 
    {
        display: block;
    }
}
</style>