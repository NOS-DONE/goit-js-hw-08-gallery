import imagesList from "./gallery-items.js";

// console.table(images);

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    closeButton: document.querySelector('[data-action="close-lightbox"]'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
    fullSizeImage: document.querySelector('.lightbox__image'),
};

const images = imagesList.map(({preview, original, description}, index) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
      />
    </a>
  </li>`;
}).join('');

refs.gallery.addEventListener('click', handleGalleryElementClick);
refs.closeButton.addEventListener('click', handleCloseModalButton);
refs.lightbox.addEventListener('click', handleModalOverlayClick);
refs.gallery.innerHTML = images;
let activeIndex = 0;

function handleGalleryElementClick(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'IMG') {
        return;
    }
    window.addEventListener('keydown', handleKeys);

    refs.lightbox.classList.add('is-open');
    refs.fullSizeImage.src = e.target.dataset.source;
    refs.fullSizeImage.alt = e.target.alt;
    activeIndex = Number(e.target.dataset.index);
}

function handleCloseModalButton() {
    closeModal()
    refs.fullSizeImage.src = '';

}

function handleModalOverlayClick(e) {
    if(!e.target.classList.contains('lightbox__overlay')) {
        return;
    }
    closeModal()
}

function handleKeys(e) {
    console.log(e);
    if(e.code === 'Escape') {
        closeModal()
    }
    
    if(e.code === 'ArrowLeft' &&  activeIndex > 0) {
        console.log(activeIndex);
        refs.fullSizeImage.src = imagesList[activeIndex - 1].original;
        activeIndex -= 1;
        console.log(activeIndex);

    }

    if(e.code === 'ArrowRight' &&  activeIndex < imagesList.length - 1) {
        console.log(activeIndex);
        refs.fullSizeImage.src = imagesList[activeIndex + 1].original;
        activeIndex += 1;
        console.log(activeIndex);

    }

}




function closeModal() {
    refs.lightbox.classList.remove('is-open');
    window.removeEventListener('keydown', handleKeys);
}



