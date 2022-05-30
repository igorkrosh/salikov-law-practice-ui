export default function ({ app }) {
    
    app.router.beforeEach((to, from, next) => {
        if (to.name == 'index')
        {
            app.router.push('/login');
        }

        console.log()

        app.$axios.get('/api/user')
        .then(response => {
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