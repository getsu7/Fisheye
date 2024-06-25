import { usePhotographerTemplate } from '../templates/photographer.js';
const { getUserCardDOM } = usePhotographerTemplate();

export const usePhotographerFactorie = () => {
  const displayData = async (photographers) => {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
      const userCardDOM = getUserCardDOM(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  };
  return { displayData };
};
