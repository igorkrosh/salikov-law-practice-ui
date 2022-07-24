export default function ({ app }) {
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
    
}