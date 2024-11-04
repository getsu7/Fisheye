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
        a.setAttribute('href', `/photographer.html?id=${id}`);
        a.setAttribute('aria-label', `Lien vers la page de ${name}`);
        a.appendChild(imgContainer);
        a.appendChild(h2);

        const h3 = document.createElement('p');
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
        const { name, tagline, city, country, portrait } = data;
        const picturePath = `assets/photographers/${portrait}`;

        const infos = document.createElement('div');
        infos.setAttribute('class', 'photograph-header__info');

        infos.innerHTML = `
          <h1 class="photograph-header__name">${name}</h1>
          <h2 class="photograph-header__location">${city}, ${country}</h2>
          <p class="photograph-header__tagline">${tagline}</p>`;

        const photographerPortrait = document.createElement('div');
        photographerPortrait.setAttribute('class', 'photograph-header__picture-wrapper');

        photographerPortrait.innerHTML = `<img class="photograph-header__picture" src="${picturePath}" alt="${name} profil picture" />`;
        return { infos, photographerPortrait };
    };

    const getPictureCardDOM = (media) => {
        const picturePath = `assets/medias/${media.image}`;
        const card = document.createElement('div');
        card.setAttribute('class', 'media-card');

        card.innerHTML = `
      <img id="${media.id}" class="media-card__thumbnail-image thumbnail"  src="${picturePath}" tabindex="0" alt="${media.title}"/>
      <div class="media-card__desc">
        <h3 class="media-card__title">${media.title}</h3> 
        <span id="${media.id}" data-likes="${media.likes}" class="media-card__like" tabindex="0">
          <i>${media.likes}</i>
          <img src="assets/icons/like.png" alt="${media.likes} likes">
        </span>
      </div>
    `;

        return card;
    };

    const getVideoCardDOM = (media) => {
        const videoPath = `assets/medias/${media.video}`;
        const card = document.createElement('div');
        card.setAttribute('class', 'media-card');

        card.innerHTML = `
      <video id="${media.id}" class="media-card__thumbnail-video thumbnail" aria-label="${media.title}" tabindex="0"><source src="${videoPath}" type="video/mp4"/></video>
      <div class="media-card__desc">
        <h3 class="media-card__title">${media.title}</h3>
        <span id="${media.id}" data-likes="${media.likes}" class="media-card__like" tabindex="0">
          <i>${media.likes}</i>
          <img src="assets/icons/like.png" alt="${media.likes} likes">
        </span>
      </div>
    `;

        return card;
    };

    const getFooterPhotographerDOM = (photographer, likes) => {
        const { price } = photographer;
        const footer = document.createElement('footer');
        footer.innerHTML = `
     <span>
        <i id="like-counter" tabindex="0">${likes}</i>
        <img src="assets/icons/like-dark.png" alt="like icon" />
      </span>
      <span>
        <i tabindex="0">${price}€ / jour </i>
      </span>
    `;
        return footer;
    };

    return { getUserCardDOM, getHeaderPhotographerDOM, getPictureCardDOM, getVideoCardDOM, getFooterPhotographerDOM };
};
