<template lang="pug">
.user.block
    img(v-if="profile.avatar" :src="profile.avatar", alt="").avatar
    img(v-else src="/assets/images/avatar.jpg", alt="").avatar
    .wrapper
        span {{profile.name}} {{profile.lastName}}
        span.type(v-if="profile.role == 'user'") Слушатель
        span.type(v-if="profile.role == 'admin'") Администратор
        span.type(v-if="profile.role == 'educator'") Преподаватель
</template>

<script>
export default {
    props: ['profile']
}
</script>

<style>

</style>