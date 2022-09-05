<template lang="pug">
Modal(name="review" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-block
        .btn-modal-close(@click="$modal.hide('review')")
        h3 Отзыв пользователя {{name}}
        p {{text}}
</template>

<script>
export default {
    props: ['name', 'text']
}
</script>

<style>

</style>