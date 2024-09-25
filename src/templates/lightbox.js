export const useLightboxTemplate = () => {
  const getLightBoxPictureDOM = (media) => {
    const picturePath = `assets/medias/${media.image}`;
    const lightBox = document.createElement('div');
    lightBox.setAttribute('class', 'light-box__modal');

    lightBox.innerHTML = `
    <div class="light-box__left-side"><img class="light-box__back-arrow" src="../../assets/icons/back-arrow.png" alt="back-arrow"/></div>
    <div class="light-box__content"><img src="${picturePath}" alt="${media.title}"/><p>${media.title}</p></div>
    <div class="light-box__right-side"><img class="light-box__close-button" src="../../assets/icons/close.svg" alt="close modal button"><img class="light-box__next-arrow" src="../../assets/icons/next-arrow.png" alt="next-arrow"/></div>
    `;
    return lightBox;
  };

  const getLightBoxVideoDOM = (media) => {
    const lightBox = document.createElement('div');
    lightBox.setAttribute('class', 'light-box__modal');

    lightBox.innerHTML = `
    <div class="light-box__left-side"><img class="light-box__back-arrow" src="../../assets/icons/back-arrow.png" alt="back-arrow"/></div>
    <div class="light-box__content"><video aria-label="${media.title}" controls><source src="${videoPath}" type="video/mp4"/></video><p>${media.title}</p></div> 
    <div class="light-box__right-side"><img class="light-box__close-button" src="../../assets/icons/close.svg" alt="close modal button"><img class="light-box__next-arrow" src="../../assets/icons/next-arrow.png" alt="next-arrow"/></div>
    `;
    return lightBox;
  };

  const getLightBoxVideoContent = (media) => {
    const videoPath = `assets/medias/${media.video}`;
    const content = document.createElement('div');
    content.setAttribute('class', 'light-box__content');

    content.innerHTML = `
      <video aria-label="${media.title}" controls><source src="${videoPath}" type="video/mp4"/></video><p>${media.title}</p>
    `;
    return content;
  };

  const getLightBoxImageContent = (media) => {
    const picturePath = `assets/medias/${media.image}`;
    const content = document.createElement('div');
    content.setAttribute('class', 'light-box__content');

    content.innerHTML = `
      <img src="${picturePath}" alt="${media.title}"/><p>${media.title}</p>
    `;
    return content;
  };

  return {
    getLightBoxPictureDOM,
    getLightBoxVideoDOM,
    getLightBoxImageContent,
    getLightBoxVideoContent
  };
};
