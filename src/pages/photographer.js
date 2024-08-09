import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographerById, getPhotographers, getPhotographerLikes } = usePhotographerService();
import { usePhotographerTemplate } from '../templates/photographer.js';
const { getHeaderPhotographerDOM, getFooterPhotographerDOM } = usePhotographerTemplate();
import { useMediaFactorie } from '../factories/mediaFactorie.js';
const { createMediaCard } = useMediaFactorie();

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));

const displayData = async (data, likes) => {
  const { infos, photographerPortrait } = getHeaderPhotographerDOM(data);
  const footer = getFooterPhotographerDOM(data, likes);

  const contactButton = document.querySelector('.contact_button');
  contactButton.before(infos);
  contactButton.after(photographerPortrait);

  if (document.querySelector('.media-card__list')) {
    const mediaCardList = document.querySelector('.media-card__list');
    data.media.forEach((media) => {
      const mediaCard = createMediaCard(media);
      mediaCardList.appendChild(mediaCard);
    });
    mediaCardList.after(footer);
  }
};

const init = async () => {
  const photographers = await getPhotographers();
  const photographer = await getPhotographerById(idPhotographer, photographers);
  const likes = getPhotographerLikes(photographer);

  await displayData(photographer, likes);
};
init();
