import { usePhotographerService } from '../api/photographerService.js';
const { getPhotographerById, getPhotographers } = usePhotographerService();

const idPhotographer = parseInt(new URL(document.location).searchParams.get('id'));

const init = async () => {
  const photographers = await getPhotographers();
  const photographer = await getPhotographerById(idPhotographer, photographers);
};
init();
