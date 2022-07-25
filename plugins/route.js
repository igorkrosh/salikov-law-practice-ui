export default function ({ app }) {
    /*
    app.router.beforeEach((to, from, next) => {
        app.$axios.get('/api/user')
        .then(response => {
            if (to.name == 'login' || to.name == 'register')
            {
                app.router.push('/dashboard');
                next();
            }
            next();
        })
        .catch(error => {
            console.log(error)
            if (to.name == 'login' || to.name == 'register')
            {
                next();
            }
            else 
            {
                app.router.push('/login');
                next();
            }
        })
    })
    */

    console.log('route')

    app.$axios.get('/api/user')
    .then(response => {
        app.store.dispatch('SET_AUTH', true);
        console.log(response)

        if (!response.data.email_verified_at)
        {
            app.router.push('/register/verification');
        }

    })
}