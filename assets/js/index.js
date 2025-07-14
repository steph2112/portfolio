const base64 = "aGVsbG95b3U=";
const expected = atob(base64);

window.addEventListener('load', function () {
    const token = localStorage.getItem('userToken');

    const expected = atob(base64);
    if (!token || token !== expected) {
        if (window.location.pathname.includes("login")) {
            return;
        }
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = 'login.html';
    }
})

function login() {
    const token = document.getElementById('token-input').value;


    const expected = atob(base64);
    if (token !== expected) {
        document.getElementById('error-message').innerHTML = "Incorrect password. Please try again. If you want to have access please contact me <a href='mailto:stephanie.br.flores@gmail.com'>here</a>.";
        return;
    }
    document.getElementById('error-message').innerHTML = "";
    localStorage.setItem('userToken', token);

    const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectAfterLogin || 'index.html';
}