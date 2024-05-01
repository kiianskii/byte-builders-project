import { useDispatch } from "react-redux";
import Currency from "../../components/Currency/Currency";
import TransactionList from "../../components/TransactionList/TransactionList";
import { signInThunk, signOutThunk } from "../../redux/auth/operations";

function HomeTab() {
  const user = {
    email: "stepan123123@mail.com",
    password: "stepan123123@mail.com",
  };
  const dispatch = useDispatch();
  function login(user) {
    dispatch(signInThunk(user));
  }
  return (
    <div>
      HomePage
      <button
        onClick={() => {
          login(user);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch(signOutThunk());
        }}
      >
        Log out
      </button>
      <Currency />
      <TransactionList />
    </div>
  );
}

export default HomeTab;
