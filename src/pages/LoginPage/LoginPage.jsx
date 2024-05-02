import LoginForm from "../../components/LoginForm/LoginForm";

import { useDispatch } from "react-redux";
import { signInThunk } from "../../redux/auth/operations";

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    try {
      dispatch(signInThunk(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initialValues = {
    email: "stepan123123@mail.com",
    password: "stepan123123@mail.com",
  };

  return (
    <LoginForm
      title="Login"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      type="login"
    />
  );
}
