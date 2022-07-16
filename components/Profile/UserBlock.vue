<template lang="pug">
.user.block
    img(v-if="$store.getters.USER.avatar" :src="$store.getters.USER.avatar", alt="").avatar
    img(v-else src="/assets/images/avatar.jpg", alt="").avatar
    .wrapper
        span {{$store.getters.USER.name}} {{$store.getters.USER.lastName}}
        span.type(v-if="$store.getters.USER.role == 'user'") Слушатель
        span.type(v-if="$store.getters.USER.role == 'admin'") Администратор
        span.type(v-if="$store.getters.USER.role == 'educator'") Преподаватель
</template>

<script>
export default {

}
</script>

<style>

</style>