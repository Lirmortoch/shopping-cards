async function sendData(obj) {
    try {
        const resp = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });

        if (!resp.ok) {
            const errorMsg = await resp.text();
            throw new Error(errorMsg);
        }

        const data = await resp.json();

        if (resp.status === 201 && data.token.length !== 0) window.location.href = '../Cards/cards.html'
    }
    catch(err) {
        console.error(err);
    }
}

function checkData(e) {
    e.preventDefault();

    const userName = e.target.querySelector('#form-username').value;
    const passWord = e.target.querySelector('#form-password').value;

    sendData({username: userName, password: passWord});
}

document.querySelector('.main__form').addEventListener('submit', checkData);