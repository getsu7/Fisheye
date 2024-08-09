import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographers } = usePhotographerService();
import { usePhotographerTemplate } from '../templates/photographer.js';
const { getUserCardDOM } = usePhotographerTemplate();

const displayData = async (photographers) => {
  if (document.querySelector('.photographer_section')) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
      const userCardDOM = getUserCardDOM(photographer);
      photographersSection.appendChild(userCardDOM);
    });
  }
};

const init = async () => {
  const photographers = await getPhotographers();
  await displayData(photographers);
};
init();
