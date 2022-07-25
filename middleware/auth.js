export default function ({ store, redirect }) 
{
    if (!store.getters["AUTH"])
    {
        console.log('auth')
        return redirect("/login");
    }
    return;
}