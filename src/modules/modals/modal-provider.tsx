import React from "react";
import { ModalWrapper } from "./modal-container";
import { ModalContext } from "./modal-context";

export const ModalProvider = (props: { children: React.ReactNode }) => {
  let [modal, setModal] = React.useState(false);
  let [modalContent, setModalContent] =
    React.useState<React.ReactElement | null>(null);

  let handleModal = (content: React.ReactElement | null) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return (
    <ModalContext.Provider
      value={{ modalState: modal, handleModal, modalContent }}
    >
      {props.children}
      <ModalWrapper />
    </ModalContext.Provider>
  );
};
