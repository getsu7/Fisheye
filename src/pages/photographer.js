import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographerById, getPhotographers, getPhotographerLikes } = usePhotographerService();
import { usePhotographerTemplate } from '../templates/photographer.js';
const { getHeaderPhotographerDOM, getFooterPhotographerDOM } = usePhotographerTemplate();
import { useMediaFactorie } from '../factories/mediaFactorie.js';
import { orderBy } from '../utils/mediaFilter.js';
const { createMediaCard } = useMediaFactorie();

let photographers;
let photographer;
let likes;

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));
const mediaFilter = document.querySelector('.media-filter');

mediaFilter.addEventListener('change', (e) => {
  photographer.media = orderBy(e.target.value, photographer.media);
  const oldMediaCardList = document.querySelector('.media-card__list');
  oldMediaCardList.remove();
  createMediaCardList(photographer);
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
  photographers = await getPhotographers();
  photographer = await getPhotographerById(idPhotographer, photographers);
  likes = getPhotographerLikes(photographer);

  await displayData(photographer, likes);
};
init();
