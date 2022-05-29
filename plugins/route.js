export default function ({ app }) {
    app.router.beforeEach((to, from, next) => {
        app.store.dispatch('system/SET_LOADING', true)
        console.log('route')
        next();
    })
}