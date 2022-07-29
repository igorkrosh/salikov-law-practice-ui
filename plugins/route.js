/*
export default async function ({ app }) {
    await app.$axios.get('/api/user')
    .then(response => {
        app.store.dispatch('SET_AUTH', true);
        console.log(response)

        if (!response.data.email_verified_at)
        {
            app.router.push('/register/verification');
        }

    })
}
*/