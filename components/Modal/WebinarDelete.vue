<template lang="pug">
Modal(name="webinar-delete" height="auto" classes="dialog" :adaptive="true" :scrollable="true")
    .card.course-delete
        .btn-modal-close(@click="$modal.hide('webinar-delete')")
        h3 Вы точно уверены, что хотите удалить вебинар?
        .btn-wrapper 
            button.btn.red.sm(@click="$emit('delete-webinar')") Удалить
            button.btn.blue.sm(@click="$modal.hide('webinar-delete')") Отмена

</template>

<script>
export default {
    
}
</script>

<style>

</style>