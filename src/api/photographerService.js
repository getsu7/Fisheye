export const usePhotographerService = () => {
  const getPhotographers = async () => {
    if (window.localStorage.getItem('photographers') === null) {
      const response = await fetch('./data/photographers.json');
      const results = await response.json();

      const photographers = results.photographers.map((photographer) => ({
        ...photographer,
        media: []
      }));

      const photographersById = {};
      photographers.forEach((photographer) => {
        photographersById[photographer.id] = photographer;
      });

      results.media.forEach((media) => {
        const photographerId = media.photographerId;
        if (photographersById[photographerId]) {
          photographersById[photographerId].media.push(media);
        }
      });

      window.localStorage.setItem('photographers', JSON.stringify(photographers));
    }
    return JSON.parse(window.localStorage.getItem('photographers'));
  };

  const getPhotographerById = (idPhotographer, photographers) => {
    //return exception si pas de phtotographer.id
    return photographers.find((photographer) => photographer.id === idPhotographer);
  };

  return { getPhotographers, getPhotographerById };
};
