export const usePhotographerTemplate = () => {
  const getUserCardDOM = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    const article = document.createElement('article');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('alt', 'Portrait de ' + name);

    const imgContainer = document.createElement('div');
    imgContainer.append(img);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const a = document.createElement('a');
    a.setAttribute('href', `/FishEye/photographer.html?id=${id}`);
    a.setAttribute('aria-label', `Lien vers la page de ${name}`);
    a.appendChild(imgContainer);
    a.appendChild(h2);

    const h3 = document.createElement('h3');
    h3.textContent = city + ', ' + country;

    const p = document.createElement('p');
    p.textContent = tagline;

    const i = document.createElement('i');
    i.textContent = price + '€/jour';

    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(i);
    return article;
  };

  const getHeaderPhotographerDOM = (data) => {
    const { media, name, tagline, city, country, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    const headerName = document.querySelector('.photograph-header__name');
    headerName.textContent = name;
    const headerLocation = document.querySelector('.photograph-header__location');
    headerLocation.textContent = city + ', ' + country;
    const headerTagline = document.querySelector('.photograph-header__tagline');
    headerTagline.textContent = tagline;
    const headerPicture = document.querySelector('.photograph-header__picture');
    headerPicture.setAttribute('src', picture);
    headerPicture.setAttribute('alt', name);

    console.log('log', media);
  };

  return { getUserCardDOM, getHeaderPhotographerDOM };
};
