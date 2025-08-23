let items;

function showItems(items) {
    const cards = document.querySelector('.main__cards.cards');
    
    cards.innerHTML = '';
    items.forEach(item => {
        cards.insertAdjacentHTML('beforeend', `
                <div class='cards__item card pop-up-open-btn' draggable='true'>
                    <div class='card__image'>
                        <img src='${item.image}' alt='product photo' draggable='false'>
                    </div>
                    <div class='card__price'>
                        <span>$${item.price}</span> 
                        <span>
                            ${item.rating.rate}
                            ☆
                        </span>
                    </div>
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

        localStorage.setItem('items', JSON.stringify(data));
        showItems(data);
    }
    catch(err) {
        console.error(err);
    }
}

getItems();

const getObjValue = (obj, path) => path.split(' ').reduce((acc, key) => acc?.[key], obj);

function sortItems(array, property, highToLow = false) {
    const temp = [...array]; 

    if (highToLow) {
        return temp.sort((a,b) => {
            if (getObjValue(a, property) < getObjValue(b, property)) return 1;
            else if (getObjValue(a, property) > getObjValue(b, property)) return -1;

            return 0;
        });
    }

    return temp.sort((a,b) => {
        if (getObjValue(a, property) > getObjValue(b, property)) return 1;
        else if (getObjValue(a, property) < getObjValue(b, property)) return -1;

        return 0;
    });
}

items = JSON.parse(localStorage.getItem('items')); 

// Pop-Up functions
function showItem(popUp, target) {
    const itemTitle = target.closest('.cards__item').querySelector('.card__title').textContent;
    const item = items.filter(item => item.title === itemTitle)[0];
    const popUpWrap = popUp.querySelector('.pop-up__wrap');
    
    popUpWrap.innerHTML = '';

    popUpWrap.insertAdjacentHTML('beforeend', `
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
            <p class='item-page__rating'></p>
        </div>
    `);

    popUpWrap.querySelector('.item-page__title').textContent = item.title;
    popUpWrap.querySelector('.item-page__photo > img').src = item.image;
    popUpWrap.querySelector('.item-page__description').textContent = item.description;
    popUpWrap.querySelector('.item-page__price').innerHTML = `
        <span>$${item.price}</span> 
    `;
    popUpWrap.querySelector('.item-page__rating').innerHTML = `
        <span>
            ${item.rating.rate}☆
        </span>
        <span>
            ${item.rating.count} reviews
        </span>
    `;
}
function showNotification(popUp, text = 'Item was added successfully') {
    const popUpWrap = popUp.querySelector('.pop-up__wrap');

    popUpWrap.innerHTML = '';
    popUpWrap.insertAdjacentHTML('beforeend', `
        <p class='pop-up__text'>${text}</p>
    `);

    popUp.classList.add('active');

    setTimeout(() => {
        popUp.classList.remove('notification');
        popUp.classList.remove('active');
        popUp.classList.remove('ora');
    }, 5000);
}

function openPopUp(e) {
    const target = e.target.closest('.pop-up-open-btn');
    
    if (target === null) return;
    
    let popUp = document.querySelector('.pop-up-page');
    showItem(popUp, target);

    document.body.classList.add('pop-up-lock');
    popUp.style.top = window.scrollY + 'px';

    popUp.classList.add('active');
}
function closePopUp(e) {
    const target = e.target.closest('.pop-up__close-btn');
    
    if (target === null) return;

    const popUp = document.querySelector('.pop-up');
    
    popUp.classList.remove('item-page');
    popUp.classList.remove('notification');
    popUp.classList.remove('active');
    
    document.body.classList.remove('pop-up-lock');
}

document.addEventListener('click', openPopUp);
document.addEventListener('click', closePopUp);

function createPopUp() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class='pop-up pop-up-background pop-up-page'>
            <div class='pop-up__block'>
                <div class="pop-up__wrap pop-up-content">
                    
                </div>
            </div>
        </div>
    `);
}
createPopUp();

function createPopUpNotific() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class='pop-up pop-up-background pop-up-notific'>
            <div class='pop-up__block'>
                <div class="pop-up__wrap pop-up-content">
                    
                </div>
            </div>
        </div>
    `);
}
createPopUpNotific();

// Cart functions

// let cursor = {
//     x: null,
//     y: null,
// }
// let card = {
//     dom: null,
//     x: null,
//     y: null,
// }

// function clickOnItem(e) {
//     const target = e.target.closest('.card');
    
//     if (target === null) return;

//     e.preventDefault();

//     const temp = e.target.classList.contains('card') ? e.target : e.target.parentElement.parentElement;

//     cursor = {
//         x: e.clientX,
//         y: e.clientY,
//     }
//     card = {
//         dom: temp,
//         x: e.target.getBoundingClientRect().left,
//         y: e.target.getBoundingClientRect().top,
//     }

//     card.dom.style.position = 'absolute';
//     card.dom.style.width = '200px';
//     card.dom.style.height = '200px';
// }
// function moveItem(e) {
//     if (card.dom === null) return;
    
//     e.preventDefault();

//     let currentCursor = {
//         x: e.clientX,
//         y: e.clientY,
//     }
//     let distance = {
//         x: currentCursor.x - cursor.x,
//         y: currentCursor.y - cursor.y,
//     }

//     card.dom.style.left = `${(card.x + distance.x)}px`;
//     card.dom.style.top = `${(card.y + distance.y)}px`;

//     card.dom.style.cursor = 'grab';
// }
// function endItemMove() {
//     if (card.dom === null) return;

//     card.dom.style.cursor = 'auto';

//     card.dom = null;
// }

// document.addEventListener('mousedown', clickOnItem);
// document.addEventListener('mousemove', moveItem);
// document.addEventListener('mouseup', endItemMove);

const cartBtn = document.querySelector('.cart');
const cart = document.querySelector('.cart-section__items');
const cartCount = cartBtn.querySelector('.cart__after');
const popUpNotification = document.querySelector('.pop-up-notific');

let selected = null;

function addItemToCart(e) {
    if (!e.target.classList.contains('card')) return;

    selected = e.target;
}
function dropItem(e) {
    cart.insertAdjacentHTML('beforeend', `
        <li class='cart-section__item cart-item'>
            ${selected.innerHTML}
            <button class='cart-item__delete-btn button my-links__button'>Delete</button>
        </li>
    `);
    
    let temp = Number(cartCount.textContent);
    cartCount.textContent = ++temp;

    showNotification(popUpNotification);
}
function dragOverItem(e) {
    e.preventDefault();
}

document.addEventListener('dragstart', addItemToCart);
cartBtn.addEventListener('drop', dropItem);
cartBtn.addEventListener('dragover', dragOverItem);

function clearCart(e) {
    if (!e.target.classList.contains('cart-items__delete-all-btn')) return;

    cart.innerHTML = '';
    cartCount.textContent = 0;
}
function deleteItem(e) {
    if (!e.target.classList.contains('cart-item__delete-btn')) return;

    e.target.parentElement.remove();
    let temp = Number(cartCount.textContent);
    cartCount.textContent = --temp;
}

document.addEventListener('click', deleteItem);
document.addEventListener('click', clearCart);

// Search and Sort Functions
function showFoundedItem(e) {
    if (!e.target.classList.contains('search-form')) return;

    e.preventDefault();
    
    const value = document.querySelector
    ('#form-input').value;
    const temp = items.filter(item => item.title.includes(value));

    showItems(temp);
}
function viewBy(e) {
    if (!e.target.classList.contains('form__group')) return;

    const isReverse = e.target.selectedOptions[0].dataset.reverse;

    const array = sortItems(items, e.target.value, isReverse);
    showItems(array);
}

document.addEventListener('input', viewBy);
document.addEventListener('submit', showFoundedItem);

function ora(e) {    
    showNotification(popUpNotification, 'ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA');

    setTimeout(() => {
        window.location.href = 'https://www.youtube.com/watch?v=_Mp7DlzgrUA&ab_channel=SonPlatinum';
    }, 5750);
}
document.querySelector('.logo__star').addEventListener('click', ora);