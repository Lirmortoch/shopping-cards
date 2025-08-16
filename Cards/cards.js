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

function createPopUp() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class='pop-up pop-up-background'>
            <div class='pop-up__block'>
                <div class="pop-up__wrap">
                    <button class='pop-up__close-btn'></button>

                    <div class="pop-up__item-page item-page">
                        <h2 class="item-page__title"></h2>
                        <div class="item-page__photo"></div>
                        <p class="item-page__description"></p>
                    </div>
                </div>
            </div>
        </div>
    `);
}
