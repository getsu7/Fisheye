import { usePhotographerTemplate } from '../templates/photographer.js';
const { getPictureCardDOM, getVideoCardDOM } = usePhotographerTemplate();

export const useMediaFactorie = () => {
  const createMediaCard = (media) => {
    if (media.video) return getVideoCardDOM(media);
    if (media.image) return getPictureCardDOM(media);
  };
  return { createMediaCard };
};
