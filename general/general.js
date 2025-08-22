function keepOpenDropMenu(e) {
    const isDropDownButton = e.target.matches('[data-dropdown-button], [data-dropdown-button] *');

    if (!isDropDownButton && e.target.closest('[data-dropdown]') !== null) return;

    let currentDropDown;

    if (isDropDownButton) {
        currentDropDown = e.target.closest('[data-dropdown]');

        if (currentDropDown.querySelector('.dropdown__content').innerHTML.length !== 0) currentDropDown.classList.toggle('active');

        currentDropDown.querySelector(`.${currentDropDown.className.match(/(nested-dropdown)|(main-dropdown)/)[0]} > button > .dropdown__caret`)?.classList.toggle('caret__rotate'); 
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropDown => {
       if (dropDown === currentDropDown || currentDropDown?.closest('.nested-dropdown')!== null && currentDropDown?.closest('.nested-dropdown') !== undefined) return;
       
       dropDown.classList.remove('active');
       dropDown.querySelector(`.${dropDown.className.match(/(nested-dropdown)|(main-dropdown)/)[0]} > button > .dropdown__caret`)?.classList.toggle('caret__rotate'); 
    });
}

document.addEventListener('click', keepOpenDropMenu);

const delay = 4000;

setTimeout(() => {
    document.querySelector('.star').classList.add('show-star');
}, delay*3);