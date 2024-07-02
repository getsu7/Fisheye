import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographerById, getPhotographers } = usePhotographerService();
import { usePhotographerFactorie } from '../factories/photographerFactorie.js';
const { displayData } = usePhotographerFactorie();

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));

const init = async () => {
  const photographers = await getPhotographers();
  const photographer = await getPhotographerById(idPhotographer, photographers);
  await displayData(photographer);
};
init();
