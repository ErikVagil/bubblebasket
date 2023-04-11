(async () =>
{
    let authenticated = false;
    const userName = localStorage.getItem('userName');
    if (userName)
    {
        const nameElement = document.querySelector('#userName');
        nameElement.value = userName;
        const user = await getUser(nameElement.value);
        authenticated = user?.authenticated;
    }

    if (authenticated)
    {
        document.querySelector('#playerName').textContent = userName;
        setDisplay('loginControls', 'none');
        setDisplay('authenticatedControls', 'block');
    }
    else
    {
        setDisplay('loginControls', 'block');
        setDisplay('authenticatedControls', 'none');
    }
})();

async function loginUser()
{
    loginOrCreate(`/api/auth/login`);
}

async function createUser()
{
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint)
{
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: 
        {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const body = await response.json();

    if (response?.status === 200)
    {
        localStorage.setItem('userName', userName);
        window.location.href = 'main.html';
    }
    else
    {
        const modalElement = document.querySelector('#msgModal');
        modalElement.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalElement, {});
        msgModal.show();
    }
}

function useApp()
{
    window.location.href = 'main.html';
}

function logout()
{
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(email)
{
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
        return response.json();
    }
    else
    {
        return null;
    }
}

function setDisplay(controlId, display)
{
    const playControlElement = document.querySelector(`#${controlId}`);
    if (playControlElement)
    {
        playControlElement.style.display = display;
    }
}