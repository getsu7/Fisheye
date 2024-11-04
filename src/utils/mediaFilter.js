export const orderBy = (selectValue, medias) => {
    switch (selectValue) {
        case 'popularity':
            return medias.sort((a, b) => a.likes - b.likes);
        case 'date':
            return medias.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'title':
            return medias.sort((a, b) => a.title.localeCompare(b.title));
        default:
    }
};
