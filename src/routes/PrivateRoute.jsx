import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/slice";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};