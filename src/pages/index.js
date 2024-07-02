import { usePhotographerService } from '../api/photographerService.js';
import { usePhotographerFactorie } from '../factories/photographerFactorie.js';
const { getPhotographers } = usePhotographerService();
const { displayData } = usePhotographerFactorie();

const init = async () => {
  const photographers = await getPhotographers();
  await displayData(photographers);
};
init();
