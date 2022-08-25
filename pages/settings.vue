<template lang="pug">
.col-wrapper.page-settings
    .col.first
        .card.block
            .input-wrapper(v-for="setting in settings")
                label {{setting.name}}
                input(type="text" placeholder="" v-model="setting.value")
            .btn-wrapper 
                button.btn(@click="UpdateSettings") Сохранить
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            settings: null
        }
    },
    methods: {
        LoadSettings()
        {
            this.$axios.$get(`/api/settings/all`)
            .then(response => {
                this.settings = response
            })
            .catch(error => {
                this.$notify({title: 'Ошибка загрузки настроек', text: error.response.data.message, type: 'error'})
            })
        },
        UpdateSettings()
        {
            this.$axios.$post(`/api/settings/update`, {
                settings: this.settings
            })
            .then(response => {
                this.$notify({title: 'Настройки сохранены', type: 'success'})
            })
            .catch(error => {
                this.$notify({title: 'Ошибка сохранения настроек', text: error.response.data.message, type: 'error'})
            })
        }
    },
    mounted() {
        this.$store.dispatch('SET_PAGETITLE', 'Настройки платформы')

        this.LoadSettings()
    },
}
</script>

<style lang="scss">
.page-settings
{
    .input-wrapper 
    {
        width: 100%;
    }

    .btn-wrapper 
    {
        display: flex;
        justify-content: center;
        width: 100%;
    }
}
</style>