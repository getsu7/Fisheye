import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographerById, getPhotographers, getPhotographerLikes } = usePhotographerService();
import { usePhotographerTemplate } from '../templates/photographer.js';
const { getHeaderPhotographerDOM, getFooterPhotographerDOM } = usePhotographerTemplate();
import { useMediaFactorie } from '../factories/mediaFactorie.js';
import { orderBy } from '../utils/mediaFilter.js';
import * as contactForm from '../utils/contactForm.js';
const { createMediaCard } = useMediaFactorie();
import * as lightBox from './lightbox.js';

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));
let photographer;
let likes;

const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', contactForm.useContactModal().displayModal);

const mediaFilter = document.querySelector('.media-filter');
mediaFilter.addEventListener('change', (e) => {
  photographer.media = orderBy(e.target.value, photographer.media);
  const oldMediaCardList = document.querySelector('.media-card__list');
  oldMediaCardList.remove();
  createMediaCardList(photographer);
  dispatchEvent(new CustomEvent('mediaListUpdated'));
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

const openLightbox = () => {
  const medias = document.querySelectorAll('.thumbnail');
  medias.forEach((media) =>
    media.addEventListener('click', (e) => {
      lightBox.init(e, photographer);
    })
  );
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

const init = async () => {
  const photographers = await getPhotographers();
  photographer = await getPhotographerById(idPhotographer, photographers);
  photographer.media = orderBy('popularity', photographer.media);
  likes = getPhotographerLikes(photographer);

  await displayData(photographer, likes);
};

init().then(() => {
  photographer.media.forEach((obj) => {
    Object.defineProperty(obj, 'liked', {
      value: false,
      writable: true
    });
  });
  const likesButtons = document.querySelectorAll('.media-card__like');
  likesButtons.forEach((likeButton) =>
    likeButton.addEventListener('click', (e) => {
      console.log(e.target);
    })
  );

  openLightbox();
  addEventListener('mediaListUpdated', openLightbox);
});
