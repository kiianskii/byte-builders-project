import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { signOutThunk } from "../../../redux/auth/operations";
import css from "./HeaderModal.module.css";
import { Icon } from "../../../img/Icon";

const HeaderModal = ({ closeModal }) => {
  const dispatch = useDispatch();

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
    <div className={css.modal}>
      {windowWidth >= 768 ? (
        <>
          <Icon size={36} id="logo-deskt-tab" />
          <p className={css.logo_text}>Money Guard</p>
        </>
      ) : null}
      <p className={css.question}>Are you sure you want to log out?</p>
      <ul className={css.btn_list}>
        <li>
          <button
            className={css.button_out}
            onClick={() => dispatch(signOutThunk())}
          >
            Log out
          </button>
        </li>
        <li>
          <button onClick={closeModal} className={css.button_cancel}>
            Cancel
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderModal;
