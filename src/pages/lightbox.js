import { useMediaFactorie } from '../factories/mediaFactorie.js';
import { useListener } from '../utils/listener.js';
import { isLightBoxOpen } from './photographer.js';

const { createLightBoxMediaView, createLightBoxMediaContent } = useMediaFactorie();
const { removeAllEventListenersOfType, addEventListenerWithTracking } = useListener();

let lightBoxMediaCounter = 0;
let lightBox;
let lightBoxContainer = document.querySelector('#light-box');

const displayLightBox = (event, photographer) => {
    lightBoxMediaCounter = photographer.media.findIndex((item) => item.id === parseInt(event.target.id));
    const lightBox = createLightBoxMediaView(photographer.media[lightBoxMediaCounter]);
    lightBoxContainer.appendChild(lightBox);
    lightBoxContainer.style.display = 'flex';

    return lightBox;
};

export const onClose = () => {
    removeAllEventListenersOfType(document, 'keydown');
    removeAllEventListenersOfType(document, 'closeLightBox');
    removeAllEventListenersOfType(document, 'nextArrowLightbox');
    removeAllEventListenersOfType(document, 'backArrowLightbox');
    lightBoxMediaCounter = 0;
    lightBoxContainer.style.display = 'none';
    lightBoxContainer.removeChild(lightBox);
};

export const onNextArrow = (photographer) => {
    lightBoxMediaCounter = lightBoxMediaCounter + 1;
    const oldLightBoxContent = document.querySelector('.light-box__content');
    lightBox.removeChild(oldLightBoxContent);

    const newLightBoxContent = createLightBoxMediaContent(photographer.media[lightBoxMediaCounter]);
    const left = document.querySelector('.light-box__left-side');
    left.after(newLightBoxContent);
};

export const onBackArrow = (photographer) => {
    lightBoxMediaCounter = lightBoxMediaCounter - 1;
    const oldLightBoxContent = document.querySelector('.light-box__content');
    lightBox.removeChild(oldLightBoxContent);

    const newLightBoxContent = createLightBoxMediaContent(photographer.media[lightBoxMediaCounter]);
    const left = document.querySelector('.light-box__left-side');
    left.after(newLightBoxContent);
};

export const init = (e, data) => {
    lightBox = displayLightBox(e, data);

    const handleNextArrow = () => {
        if (lightBoxMediaCounter + 1 !== data.media.length) {
            onNextArrow(data);
        }
        showArrow();
    };
    addEventListenerWithTracking(document, 'nextArrowLightbox', handleNextArrow);

    const handleBackArrow = () => {
        if (lightBoxMediaCounter !== 0) {
            onBackArrow(data);
        }
        showArrow();
    };
    addEventListenerWithTracking(document, 'backArrowLightbox', handleBackArrow);

    const closeLightBoxButton = document.querySelector('.light-box__close-button');
    closeLightBoxButton.addEventListener('click', () => {
        onClose();
        isLightBoxOpen.value = false;
    });

    const backArrowButton = document.querySelector('.light-box__back-arrow');
    backArrowButton.addEventListener('click', () => {
        onBackArrow(data);
        showArrow();
    });

    const nextArrowButton = document.querySelector('.light-box__next-arrow');
    nextArrowButton.addEventListener('click', () => {
        onNextArrow(data);
        showArrow();
    });

    const showArrow = () => {
        if (lightBoxMediaCounter === 0) {
            backArrowButton.style.display = 'none';
            nextArrowButton.style.display = 'block';
        } else if (lightBoxMediaCounter === data.media.length - 1) {
            backArrowButton.style.display = 'block';
            nextArrowButton.style.display = 'none';
        } else {
            backArrowButton.style.display = 'block';
            nextArrowButton.style.display = 'block';
        }
    };

    showArrow();
};
