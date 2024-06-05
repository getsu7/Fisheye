function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', 'Portrait de ' + name);

    const imgContainer = document.createElement('div');
    imgContainer.append(img);

    const a = document.createElement('a');
    a.setAttribute('href', `/FishEye/photographer.html?id=${id}`);
    a.setAttribute('aria-label', `Lien vers la page de ${name}`);
    a.appendChild(imgContainer);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const h3 = document.createElement('h3');
    h3.textContent = city + ', ' + country;

    const p = document.createElement('p');
    p.textContent = tagline;

    const i = document.createElement('i');
    i.textContent = price + '€/jour';

    article.appendChild(a);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(i);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
