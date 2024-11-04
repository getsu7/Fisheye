const mediaFilter = document.querySelector('#media-filter'),
    selectOptions = mediaFilter.querySelectorAll('.select-menu__option');

mediaFilter.addEventListener('click', () => {
    mediaFilter.classList.toggle('active');
});

mediaFilter.addEventListener('keydown', (ev) => {
    if (ev.code === 'Enter' || ev.code === 'Space') {
        mediaFilter.classList.toggle('active');
        selectOptions[0].focus();
    }
});

document.addEventListener('click', (event) => {
    if (!mediaFilter.contains(event.target)) {
        mediaFilter.classList.remove('active');
    }
});
