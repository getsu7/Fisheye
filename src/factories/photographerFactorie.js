import { usePhotographerTemplate } from '../templates/photographer.js';
const { getUserCardDOM, getHeaderPhotographerDOM } = usePhotographerTemplate();

export const usePhotographerFactorie = () => {
  const displayData = async (photographers) => {
    if (document.querySelector('.photographer_section')) {
      const photographersSection = document.querySelector('.photographer_section');
      photographers.forEach((photographer) => {
        const userCardDOM = getUserCardDOM(photographer);
        photographersSection.appendChild(userCardDOM);
      });
    }
    if (document.querySelector('.photograph-header')) {
      const photographerHeader = document.querySelector('.photograph-header');
      getHeaderPhotographerDOM(photographers);
    }
  };

  return { displayData };
};
