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

        if (resp.status === 201 && data.token.length !== 0) window.location.href = 'Cards/cards.html'
    }
    catch(err) {
        console.error(err);
    }
}

function checkData(e) {
    e.preventDefault();

    const userName = e.target.querySelector('#form-username').value.trim();
    const passWord = e.target.querySelector('#form-password').value.trim();

    sendData({username: userName, password: passWord});
}

document.querySelector('.main__form').addEventListener('submit', checkData);

const content = ['Do not pity the dead, Harry. Pity the living. And, above all, all those who live without love', 'If you have to ask, you will never know. If you know, you need only ask', 'username: johnd, password: m38rmF$'];
const hint = document.querySelector('.hint');
let count = 0; 

function toggleElement() {
    hint.textContent = content[count];
    count++;
    hint.classList.add('show-hint');

    if (count < 3) { 
        setTimeout(() => {
            hint.classList.remove('show-hint'); 
        }, delay*1.75);

        setTimeout(toggleElement, delay*2.35); 
    }
}

setTimeout(toggleElement, delay*3);