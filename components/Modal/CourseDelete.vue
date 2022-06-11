<template lang="pug">
Modal(name="course-delete" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-delete
        .btn-modal-close(@click="$modal.hide('course-delete')")
        h3 Вы точно уверены, что хотите удалить курс?
        .btn-wrapper 
            button.btn.red.sm(@click="$emit('delete-course')") Удалить
            button.btn.blue.sm(@click="$modal.hide('course-delete')") Отмена

</template>

<script>
export default {
    
}
</script>

<style>

</style>