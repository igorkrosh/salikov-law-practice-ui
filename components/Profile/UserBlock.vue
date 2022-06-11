<template lang="pug">
.user.block
    img(src="/assets/images/avatar_big.png", alt="").avatar
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