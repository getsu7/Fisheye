import { usePhotographerService } from '../api/photographerService.js';
import { usePhotographerTemplate } from '../templates/photographer.js';
import { useMediaFactorie } from '../factories/mediaFactorie.js';
import { orderBy } from '../utils/mediaFilter.js';
import * as contactForm from '../utils/contactForm.js';
import * as lightBox from './lightbox.js';
import { onClose } from './lightbox.js';

const { getPhotographerById, getPhotographers, getPhotographerLikes } = usePhotographerService();

const { getHeaderPhotographerDOM, getFooterPhotographerDOM } = usePhotographerTemplate();

const { createMediaCard } = useMediaFactorie();

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));
let photographer;
let likes;
let isLightBoxOpen = false;
let isContactModalOpen = false;

const mediaFilter = document.querySelector('.media-filter');

const contactButton = document.querySelector('.contact_button');
const closeContactButton = document.querySelector('.contact_modal__close-button');

const form = document.getElementById('contact_form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const post = {
        firsname: e.target[0].value,
        lastname: e.target[1].value,
        email: e.target[2].value,
        message: e.target[3].value,
    };
    console.log(post);
});

const createMediaCardList = (data) => {
    const mediaCardList = document.createElement('div');
    mediaCardList.setAttribute('class', 'media-card__list');
    data.media.forEach((media) => {
        const mediaCard = createMediaCard(media);
        mediaCardList.appendChild(mediaCard);
    });
    mediaFilter.after(mediaCardList);
    return mediaCardList;
};

const updateFooterLikesCounter = () => {
    const footer = document.querySelector('#like-counter');
    likes = getPhotographerLikes(photographer);
    footer.textContent = likes;
};

const likeMedia = (event) => {
    const curr = event.currentTarget;
    const media = photographer.media.find((media) => media.id === parseInt(curr.id));
    if (media.liked) {
        media.likes = media.likes - 1;
        media.liked = false;
        event.currentTarget.children[0].textContent = media.likes;
        updateFooterLikesCounter();
    } else {
        media.likes = media.likes + 1;
        media.liked = true;
        event.currentTarget.children[0].textContent = media.likes;
        updateFooterLikesCounter();
    }
};

const addListenerOnContact = () => {
    contactButton.addEventListener('click', contactForm.useContactModal(photographer.name).displayModal);
    closeContactButton.addEventListener('click', contactForm.useContactModal().closeModal);
};

const addListenerOnMediaFilter = () => {
    mediaFilter.addEventListener('change', (e) => {
        photographer.media = orderBy(e.target.value, photographer.media);
        const oldMediaCardList = document.querySelector('.media-card__list');
        oldMediaCardList.remove();
        createMediaCardList(photographer);
        document.dispatchEvent(new CustomEvent('mediaListUpdated'));
    });
};

const addListenerOnThumbnails = () => {
    const medias = document.querySelectorAll('.thumbnail');
    medias.forEach((media) => {
        media.addEventListener('click', (e) => {
            lightBox.init(e, photographer);
        });
        media.addEventListener('keydown', (ev) => {
            if (ev.code === 'Space' || ev.code === 'Enter') {
                lightBox.init(ev, photographer);
            }
        });
    });
};

const addListenerOnLikes = () => {
    const likesButtons = document.querySelectorAll('.media-card__like');
    likesButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', (e) => likeMedia(e));
        likeButton.addEventListener('keydown', (ev) => {
            if (ev.code === 'Space' || ev.code === 'Enter') {
                likeMedia(ev);
            }
        });
    });
};

const initListeners = () => {
    addListenerOnMediaFilter();
    addListenerOnThumbnails();
    addListenerOnLikes();
    addListenerOnContact();
};

const displayData = async (data, likes) => {
    const { infos, photographerPortrait } = getHeaderPhotographerDOM(data);
    const footer = getFooterPhotographerDOM(data, likes);

    const contactButton = document.querySelector('.contact_button');
    contactButton.before(infos);
    contactButton.after(photographerPortrait);

    const mediaCardList = createMediaCardList(data);
    mediaCardList.after(footer);
};

const keyboardEventHandler = (ev) => {
    if (isLightBoxOpen) {
        switch (ev.code) {
            case 'Escape':
            case 'Esc':
                document.dispatchEvent(new CustomEvent('closeLightBox'));
                break;
            case 'ArrowRight':
                document.dispatchEvent(new CustomEvent('nextArrowLightbox'));
                break;
            case 'ArrowLeft':
                document.dispatchEvent(new CustomEvent('backArrowLightbox'));
                break;
        }
    }
};

const handleLightBoxOpen = () => {
    isLightBoxOpen = true;
    document.addEventListener('keydown', (ev) => keyboardEventHandler(ev));
};

const init = async () => {
    const photographers = await getPhotographers();
    photographer = await getPhotographerById(idPhotographer, photographers);
    photographer.media = orderBy('popularity', photographer.media);
    likes = getPhotographerLikes(photographer);

    await displayData(photographer, likes);
    initListeners();
};

init().then(() => {
    photographer.media.forEach((obj) => {
        Object.defineProperty(obj, 'liked', {
            value: false,
            writable: true,
        });
    });
    document.addEventListener('mediaListUpdated', initListeners);

    document.addEventListener('contactModalOpened', () => {
        isContactModalOpen = true;
        const closeButton = document.querySelector('.contact_modal__close-button');
        closeButton.addEventListener('keydown', (ev) => {
            if (ev.code === 'Enter' || ev.code === 'Space') {
                contactForm.useContactModal().closeModal();
            }
        });
    });

    document.addEventListener('contactModalClosed', () => {
        const logoLink = document.querySelector('#logo__link');
        logoLink.focus();
    });

    document.addEventListener('openLightBox', handleLightBoxOpen);
    document.addEventListener('closeLightBox', () => {
        onClose();
        isLightBoxOpen = false;
    });
});
