import { useDispatch } from "react-redux";
import { signOutThunk } from "../../redux/auth/operations";

import css from "./HeaderModal.module.css";

const HeaderModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.modal}>
      <p className={css.question}>Are you sure you want to log out?</p>
      <ul>
        <li className={css.btn_list}>
          <button
            className={css.button_out}
            onClick={() => dispatch(signOutThunk())}
          >
            Log out
          </button>
        </li>
        <li>
          <button onClick={() => closeModal()} className={css.button_cancel}>
            Cancel
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderModal;
