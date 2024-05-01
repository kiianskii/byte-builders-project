import { useDispatch } from "react-redux";
import { signOutThunk } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";

const HeaderModal = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Are you sure you want to log out?</p>
      <button onClick={() => dispatch(signOutThunk())}>Log out</button>
      <button>
        <NavLink to="/">Cancel</NavLink>
      </button>
    </div>
  );
};

export default HeaderModal;
