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
                //label.radio Менеджеры
                    input(type="checkbox")
                    span.checkmark
                label.radio Преподователь
                    input(type="checkbox" v-model="filter.educator" @change="SetFilter")
                    span.checkmark
                label.radio Ученики
                    input(type="checkbox" v-model="filter.user" @change="SetFilter")
                    span.checkmark
                //label.radio Авторы
                    input(type="checkbox")
                    span.checkmark
            .filters-input 
                input.filter(placeholder="Поиск по имени" v-model="filter.name" @input="LoadUsers")
                //select.filter
                    option Поиск по направлению
                //input.filter(placeholder="Поиск по курсу")
            .table 
                .item(v-for="(user, index) in users" :key="index" @click="EditUser(user)")
                    span.name {{user.name}} {{user.last_name}}
                    span.role(v-if="user.role == 'user'") Ученик
                    span.role.educator(v-if="user.role == 'educator'") Преподователь
                    span.role.admin(v-if="user.role == 'admin'") Администратор
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
    data() {
        return {
            users: [],
            editUser: null,
            filter: {
                admin: false,
                educator: false,
                user: false,
                name: ''
            },
            filterAll: true,
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
    }
}
</script>

<style lang="scss">

</style>