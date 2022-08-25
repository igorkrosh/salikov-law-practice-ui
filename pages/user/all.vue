<template lang="pug">
.col-wrapper 
    .col.first.page-users 
            .filters-radio
                label.radio Все
                    input(type="checkbox" v-model="filterAll" )
                    span.checkmark
                label.radio Администраторы
                    input(type="checkbox" v-model="filter.admin" @change="SetFilter")
                    span.checkmark
                label.radio Модератор
                    input(type="checkbox")
                    span.checkmark
                label.radio Преподователь
                    input(type="checkbox" v-model="filter.educator" @change="SetFilter")
                    span.checkmark
                label.radio Ученики
                    input(type="checkbox" v-model="filter.user" @change="SetFilter")
                    span.checkmark
                label.radio Авторы
                    input(type="checkbox" v-model="filter.author" @change="SetFilter")
                    span.checkmark
            .filters-input 
                input.filter(placeholder="Поиск по имени" v-model="filter.name" @input="LoadUsers")
                select(v-model="filter.category" @change="LoadUsers").filter
                    option(value="") Поиск по направлению
                    option(v-for="category in categories" :value="category") {{category}}
                input.filter(placeholder="Поиск по курсу" v-model="filter.course" @input="LoadUsers")
            .filters-input 
                .input-wrapper
                    label Количество пользователей:
            .table 
                .item(v-for="(user, index) in users" :key="index" @click="EditUser(user)")
                    span.name {{user.name}} {{user.last_name}}
                    span.role(v-if="user.role == 'user'") Ученик
                    span.role.educator(v-if="user.role == 'educator'") Преподователь
                    span.role.admin(v-if="user.role == 'admin'") Администратор
                    span.role.author(v-if="user.role == 'author'") Автор
            //.navs 
                span.active 1
                span 2
                span 3 
                span ... 
                span 28

    ProfileColumnInfo 
    ModalEditUser(:user="editUser")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            users: [],
            editUser: null,
            filter: {
                admin: false,
                educator: false,
                user: false,
                author: false,
                name: '',
                category: '',
                course: '',
            },
            filterAll: true,
            categories: [],
        }
    },
    methods: {
        EditUser(user)
        {
            this.editUser = user;
            this.$modal.show('edit-user');
        },
        SetFilter() 
        {
            this.filterAll = false;

            this.LoadUsers();
        },
        LoadUsers()
        {
            this.$axios.$post('/api/user/all', {filter: this.filter})
            .then(response => {
                this.users = response;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка', text: 'Ошибка загрузки списка пользователей', type: 'error'})
            })
        },
        LoadCategories()
        {
            this.$axios.$get(`/api/course/categories`)
            .then(response => {
                this.categories = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки категорий', text: error.response.data.message, type: 'error'})
            })
        }
    },
    watch: {
        filterAll(value) {
            if (value)
            {
                this.filterAll = true;
                this.filter.admin = false;
                this.filter.educator = false;
                this.filter.user = false;

                this.LoadUsers();
            }
            else 
            {
                this.filterAll = false;
            }
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Пользователи')
        this.LoadUsers();
        this.LoadCategories();
    }
}
</script>

<style lang="scss">

</style>