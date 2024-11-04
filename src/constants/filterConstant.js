export const retrieveFilterLabelFromValue = (value) => {
    switch (value) {
        case 'popularity':
            return 'Popularité';
        case 'date':
            return 'Date';
        case 'title':
            return 'Titre';
    }
};
