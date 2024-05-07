import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//css
import css from "./Header.module.css";
//компоненти
import ModalMobile from "./ModalHeaderMobile/ModalMobile";
import HeaderModal from "./HeaderModal/HeaderModal";
import { Icon } from "../../img/Icon";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector(selectUser);
  const { openModal, isOpen, closeModal } = useToggle();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className={css.header}>
      <ul className={css.list_logo}>
        <li className={css.li}>
          {windowWidth >= 768 ? (
            <Link to="/">
              <Icon size={24} id="logo-deskt-tab" />
            </Link>
          ) : (
            <Link to="/">
              <Icon size={17.1} id="logo-mob" />
            </Link>
          )}
        </li>
        <li className={css.li}>
          <Link to="/" className={css.logo}>
            Money Guard
          </Link>
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
