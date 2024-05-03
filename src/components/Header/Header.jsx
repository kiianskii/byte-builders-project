import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { selectUser } from "../../redux/auth/authSlice";
import { Icon } from "../../img/Icon";
import { useToggle } from "../../hooks/useToggle";
import HeaderModal from "./HeaderModal/HeaderModal";
import { useEffect, useState } from "react";
import ModalMobile from "./ModalHeaderMobile/ModalMobile";

const Header = () => {
  const user = useSelector(selectUser);
  const { openModal, isOpen, closeModal } = useToggle();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={css.header}>
      <ul className={css.list_logo}>
        <li className={css.li}>
          {windowWidth >= 768 ? (
            <Icon size={24} id="logo-deskt-tab" />
          ) : (
            <Icon size={17.1} id="logo-mob" />
          )}
        </li>
        <li className={css.li}>
          <p className={css.logo}>Money Guard</p>
        </li>
      </ul>
      <div className={css.list}>
        <p className={css.name}>{user.name}</p>
        {windowWidth >= 768 ? (
          <Icon size={27} id="Vector-beetween-logo" className={css.icon} />
        ) : null}
        <button className={css.button_exit} onClick={openModal}>
          <Icon size={18} id="exit" />
          {windowWidth >= 768 ? <p className={css.name}>Exit</p> : null}
        </button>

        {isOpen && (
          <ModalMobile>
            <HeaderModal closeModal={closeModal} />
          </ModalMobile>
        )}
      </div>
    </div>
  );
};

export default Header;
