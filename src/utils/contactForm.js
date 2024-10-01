export const useContactModal = (photographerName) => {
  const displayModal = () => {
    const modal = document.getElementById('contact_modal');
    const headerName = document.querySelector('.contact_modal__header-name');
    headerName.textContent = `Contactez-moi ${photographerName}`;
    modal.style.display = 'flex';
  };
  const closeModal = () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  };
  return { displayModal, closeModal };
};
