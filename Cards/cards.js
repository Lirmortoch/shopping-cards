let items;
let cart = [];

function showItems(items) {
    const cards = document.querySelector('.main__cards.cards');

    items.forEach(item => {
        cards.insertAdjacentHTML('beforeend', `
                <div class='cards__item card'>
                    <div class='card__image'>
                        <img src='${item.image}' alt='product photo'>
                    </div>
                    <p class='card__price'>$${item.price}</p>
                    <h3 class='card__title'>${item.title}</h3>
                </div>
            `)
    });
}
async function getItems() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        if (!response.ok) {
            const errorMsg = await resp.text();
            throw new Error(errorMsg);
        }

        localStorage.setItem('items', JSON.stringify(items));
        showItems(data);
    }
    catch(err) {
        console.error(err);
    }
}

getItems();

items = JSON.parse(localStorage.getItem('items'));

function searchItem(items, title) {
    
}
function showItem(popUp, target) {
    const itemTitle = target.closest('.cards__item').querySelector('.card__title').textContent;
    const item = items.filter(item => item.title === itemTitle)[0];

    popUp.querySelector('.item-page__title').textContent = item.title;
    popUp.querySelector('.item-page__photo > img').src = item.image;
    popUp.querySelector('.item-page__description').textContent = item.description;
    popUp.querySelector('.item-page__price').textContent = `$${item.price}`;
}
function openPopUp(e) {
    const target = e.target.closest('.cards__item');
    
    if (target === null) return;
    
    const popUp = document.querySelector('.pop-up');

    popUp.classList.add('active');
    document.body.classList.add('pop-up-lock');
    window.scrollTo(0, 0);

    showItem(popUp, e.target);
}
function closePopUp(e) {
    const target = e.target.closest('.pop-up__close-btn');
    
    if (target === null) return;

    document.querySelector('.pop-up').classList.remove('active');
    document.body.classList.remove('pop-up-lock');
}

document.addEventListener('click', openPopUp);
document.addEventListener('click', closePopUp);

function createPopUp() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class='pop-up pop-up-background'>
            <div class='pop-up__block'>
                <div class="pop-up__wrap pop-up-content">
                    <button class='pop-up__close-btn close-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 16 16">
                            <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
                        </svg>
                    </button>

                    <div class="pop-up__item-page item-page">
                        <h2 class="item-page__title"></h2>
                        <div class="item-page__photo">
                            <img src='' alt='item photo'>
                        </div>
                        <p class="item-page__description"></p>
                        <p class="item-page__price"></p>
                    </div>
                </div>
            </div>
        </div>
    `);
}
createPopUp();

