// Создай галерею с возможностью клика по ее элементам 
// и просмотра полноразмерного изображения в модальном окне. 


// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Реализация делегирования на галерее ul.js-gallery 
// и получение url большого изображения.

// Открытие модального окна по клику на элементе галереи.

// Подмена значения атрибута src элемента img.lightbox__image.

// Закрытие модального окна по клику 
// на кнопку button[data-action="close-lightbox"].

// Очистка значения атрибута src элемента img.lightbox__image. 
// Это необходимо для того, чтобы при следующем 
// открытии модального окна, пока грузится изображение, мы не видели предыдущее.


// Следующий функционал не обязателен при сдаче задания, 
// но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне 
// клавишами "влево" и "вправо".

import gallery from "./gallery-items.js";


const refs = {
    ulGallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.js-lightbox .lightbox__overlay'),
    lightboxImage: document.querySelector('.js-lightbox .lightbox__image'),
    modalCloseBtn: document.querySelector('.js-lightbox button[data-action="close-lightbox"]'),
};


const makeItemsGallery = (({preview, original, description}) => {
    const item = document.createElement('li');
    item.classList.add("gallery__item");

    const link = document.createElement('a');
    link.classList.add("gallery__link");
    link.setAttribute('href', original);

    const image = document.createElement('img');
    image.setAttribute('src', preview);
    image.setAttribute('alt', description);
    image.classList.add("gallery__image");

    link.appendChild(image);
    item.appendChild(link);
    return item;
});

const itemsGallery = gallery.map(makeItemsGallery);

const urls = gallery.map(image => image.original);
const alts = gallery.map(image => image.description);


refs.ulGallery.append(...itemsGallery);

refs.ulGallery.addEventListener('click', onTagertImageClick);

function onTagertImageClick(event) {
    event.preventDefault();

    if (event.target === event.currentTarget) return; 

    const url = event.target.parentNode.getAttribute('href');
    const alt = event.target.getAttribute('alt');

    refs.lightbox.classList.add("is-open");
    refs.lightboxImage.setAttribute('src', url);
    refs.lightboxImage.setAttribute('alt', alt);

    refs.modalCloseBtn.addEventListener('click', closeModal);

    refs.lightboxOverlay.addEventListener('click', closeModal);

    window.addEventListener('keydown', onEscPress);

    window.addEventListener('keydown', onRightPress);
    window.addEventListener('keydown', onLeftPress);
    
}

function closeModal() {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImage.removeAttribute('src');
    refs.lightboxImage.removeAttribute('alt');

    refs.modalCloseBtn.removeEventListener('click', closeModal);
    refs.lightboxOverlay.removeEventListener('click', closeModal);

    window.removeEventListener('keydown', onEscPress);

    window.removeEventListener('keydown', onRightPress);
    window.removeEventListener('keydown', onLeftPress);
}


function onEscPress (event) {
    const KEY_CODE = event.code;

    if (KEY_CODE !== 'Escape') return;

    closeModal();
}

function onRightPress (event) {
    const KEY_CODE = event.code;

    if (KEY_CODE !== 'ArrowRight') return;

    const url = refs.lightboxImage.getAttribute('src');

    const currentIndex = urls.indexOf(url);

    if (currentIndex === urls.length-1) {

        refs.lightboxImage.setAttribute('src', urls[0]);
        refs.lightboxImage.setAttribute('alt', alts[0]);
    } else {
        refs.lightboxImage.setAttribute('src', urls[currentIndex + 1]);
        refs.lightboxImage.setAttribute('alt', alts[currentIndex + 1]);
    }

}

function onLeftPress (event) {
    const KEY_CODE = event.code;

    if (KEY_CODE !== 'ArrowLeft') return;

    const url = refs.lightboxImage.getAttribute('src');

    const currentIndex = urls.indexOf(url);


    if (currentIndex === 0) {

        refs.lightboxImage.setAttribute('src', urls[urls.length-1]);
        refs.lightboxImage.setAttribute('alt', alts[urls.length-1]);
    } else {
        refs.lightboxImage.setAttribute('src', urls[currentIndex - 1]);
        refs.lightboxImage.setAttribute('alt', alts[currentIndex - 1]);
    }

}


