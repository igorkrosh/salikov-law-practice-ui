<template lang="pug">
.full-page.page-users 
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
        //input.filter(placeholder="Поиск по курсу" v-model="filter.course" @input="LoadUsers")
        select(v-model="filter.course" @change="LoadUsers").filter
            option(value="") Поиск по курсу
            option(v-for="course in courses" :value="course.id") {{course.name}}
    .filters-input 
        .input-wrapper
            label Количество пользователей: {{count}}
    //.table 
        .item(v-for="(user, index) in users" :key="index" @click="EditUser(user)")
            span.name {{user.name}} {{user.last_name}}
            span.role(v-if="user.role == 'user'") Ученик
            span.role.educator(v-if="user.role == 'educator'") Преподователь
            span.role.admin(v-if="user.role == 'admin'") Администратор
            span.role.author(v-if="user.role == 'author'") Автор
    .table-data 
        table
            thead
                tr
                    th Пользователь
                    th ID
                    th Email
                    th Роль
                    th
                        .sort
                            span Дата регистрации
                            button(:class="{asc: filter.sort == 'asc', desc: filter.sort == 'desc'}" @click="SetSort()")
                                img(src='/assets/images/icons/sort.png')
            tbody
                tr(v-for="(user, index) in users" :key="index") 
                    td
                        .user(@click="EditUser(user)")
                            img(v-if="user.avatar" :src="user.avatar", alt="").avatar
                            img(v-else src="/assets/images/avatar.jpg", alt="").avatar
                            span {{user.name}} {{user.last_name}}
                    td {{user.id}}
                    td {{user.email}}
                    td 
                        span.role(v-if="user.role == 'user'") Ученик
                        span.role.educator(v-if="user.role == 'educator'") Преподователь
                        span.role.admin(v-if="user.role == 'admin'") Администратор
                        span.role.author(v-if="user.role == 'author'") Автор
                    td {{user.created_at}}

        //.navs 
            span.active 1
            span 2
            span 3 
            span ... 
            span 28
    ModalEditUser(:user="editUser")
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            users: [],
            count: 0,
            editUser: null,
            filter: {
                admin: false,
                educator: false,
                user: false,
                author: false,
                name: '',
                category: '',
                course: '',
                sort: '',
            },
            filterAll: true,
            categories: [],
            courses: []
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
                this.users = response.users;
                this.count = response.count;
            })
            .catch(error => {
                this.$notify({title: 'Ошибка', text: 'Ошибка загрузки списка пользователей', type: 'error'})
            })
        },
        LoadCourseFilter()
        {
            this.$axios.$get(`/api/course/filter`)
            .then(response => {
                this.categories = response.categories
                this.courses = response.courses
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки категорий', text: error.response.data.message, type: 'error'})
            })
        },
        SetSort()
        {
            switch (this.filter.sort) 
            {
                case '':
                    this.filter.sort = 'asc'
                    break;
                case 'asc':
                    this.filter.sort = 'desc'
                    break;
                case 'desc':
                    this.filter.sort = 'asc'
                    break;
                default:
                    break;
            }
            
            this.LoadUsers();
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
        this.$store.dispatch('SET_DISABLE_BG_WHITE', true)
        this.LoadUsers();
        this.LoadCourseFilter();
    },
    destroyed() {
        this.$store.dispatch('SET_DISABLE_BG_WHITE', false)
    },
}
</script>

<style lang="scss">

</style>