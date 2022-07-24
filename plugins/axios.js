export default function ({ $axios }) {
    if (GetCookie('XSRF-TOKEN') == '')
    {
        $axios.get('/sanctum/csrf-cookie')
    }
}

function GetCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}