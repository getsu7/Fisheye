export const useContactModal = (photographerName) => {
    const displayModal = async () => {
        document.dispatchEvent(new CustomEvent('contactModalOpened'));
        const modal = document.getElementById('contact_modal');
        const headerName = document.querySelector('.contact_modal__header-name');
        const closeButton = document.querySelector('.contact_modal__close-button');
        modal.style.display = 'flex';
        headerName.textContent = `Contactez-moi ${photographerName}`;
        closeButton.focus();
    };
    const closeModal = () => {
        const modal = document.getElementById('contact_modal');
        modal.style.display = 'none';
        document.dispatchEvent(new CustomEvent('contactModalClosed'));
    };
    return { displayModal, closeModal };
};
