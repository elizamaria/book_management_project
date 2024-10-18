import Modal from "@mui/material/Modal";
import "./modal.css";
import { useModalContext } from "./modal-context";

export const ModalWrapper = () => {
  const { modalState, handleModal, modalContent } = useModalContext();

  if (!modalContent) {
    return null;
  }

  return (
    <Modal
      open={modalState}
      onClose={() => handleModal(null)}
      aria-labelledby="modal-modal-title"
    >
      {modalContent}
    </Modal>
  );
};
