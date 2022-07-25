export default function ({ store, redirect }) 
{
    console.log('auth')
    if (!store.getters["AUTH"])
    {
        return redirect("/login");
    }
    return;
}