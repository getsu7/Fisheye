async function getPhotographers() {
  let photographers = [];

  const response = await fetch('./data/photographers.json');
  const results = await response.json();
  results.photographers.forEach((photographer) => photographers.push(photographer));

  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
