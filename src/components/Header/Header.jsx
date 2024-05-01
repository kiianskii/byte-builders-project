import { useSelector } from "react-redux";
import css from "./Header.module.css";
import { selectUser } from "../../redux/auth/authSlice";
import { Icon } from "../../img/Icon";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../../components/Modal/Modal";
import HeaderModal from "./HeaderModal";

const Header = () => {
  const user = useSelector(selectUser);
  const { openModal, closeModal, isOpen } = useToggle();

  return (
    <div className={css.header}>
      <ul className={css.list_logo}>
        <li className={css.item}>
          <Icon size={17.1} id="logo-mob" />
        </li>
        <li className={css.item}>
          <p className={css.logo}>Money Guard</p>
        </li>
      </ul>
      <ul className={css.list}>
        <li className={css.name}>
          <p>{user.name}Name</p>
          {/* <Icon size={20} id="Vector-beetween-logo" /> */}
        </li>
        <li className={css.name}>
          <button
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            <Icon size={18} id="exit" />
          </button>
          {isOpen && (
            <Modal closeModal={closeModal}>
              <HeaderModal />
            </Modal>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
