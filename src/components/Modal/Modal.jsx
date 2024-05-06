import { useCallback, useEffect } from "react";
import { Icon } from "../../img/Icon";
import { useMediaQuery } from "react-responsive";

import s from "./Modal.module.css";

const Modal = ({ children, title = "Default modal", closeModal }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className={s.wrapper} onClick={handleBackdropClick}>
      <div className={s.content}>
        <>
          <h2 className={s.title}>{title}</h2>
        </>

        {!isMobile && (
          <button onClick={closeModal} className={s.closeBtn}>
            <Icon size={16} id="close-btn" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;

// Щоб використовувати модальне вікно треба додати і заімпортувати:
// import { useToggle } from "../../hooks/useToggle"
// import Modal from "../../components/Modal/Modal"

//  const { openModal, closeModal, isOpen } = useToggle()
//
// В return додати :
{
  /* <button onClick={openModal}>Open modal</button> -------- Щось що відкриває модалку
      {isOpen && <Modal closeModal={closeModal}>
      <Navigation/>------------------------------------------Тут ваша форма яка буде всередині модалки
      </Modal>} */
}
