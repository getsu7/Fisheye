import { usePhotographerTemplate } from '../templates/photographer.js';
import { useLightboxTemplate } from '../templates/lightbox.js';

const { getPictureCardDOM, getVideoCardDOM } = usePhotographerTemplate();

const { getLightBoxPictureDOM, getLightBoxVideoDOM, getLightBoxImageContent, getLightBoxVideoContent } =
  useLightboxTemplate();

export const useMediaFactorie = () => {
  const createMediaCard = (media) => {
    if (media.video) return getVideoCardDOM(media);
    if (media.image) return getPictureCardDOM(media);
  };

  const createLightBoxMediaView = (media) => {
    if (media.video) return getLightBoxVideoDOM(media);
    if (media.image) return getLightBoxPictureDOM(media);
  };

  const createLightBoxMediaContent = (media) => {
    if (media.video) return getLightBoxVideoContent(media);
    if (media.image) return getLightBoxImageContent(media);
  };
  return { createMediaCard, createLightBoxMediaView, createLightBoxMediaContent };
};
