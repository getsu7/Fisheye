export const useContactModal = () => {
  const displayModal = () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
  };
  const closeModal = () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  };
  return { displayModal, closeModal };
};
