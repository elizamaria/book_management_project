import { createContext, useContext } from "react";

interface ModalContextType {
  modalState: boolean;
  handleModal: (content: React.ReactElement | null) => void;
  modalContent: React.ReactElement | null;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("error");
  }

  return modalContext;
};
