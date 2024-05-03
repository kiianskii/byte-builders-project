import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
// import { selectIsRefreshing } from './redux/auth/authSlice'
import { refreshThunk } from "./redux/auth/operations";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomeTab from "./pages/HomeTab/HomeTab";
// import { userTransactionsThunk } from "./redux/transactions/operations";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { currencyThunk } from "./redux/currency/operations";

function App() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(refreshThunk());
    dispatch(currencyThunk());
  }, [dispatch]);

  // const isRefreshing = useSelector(selectIsRefreshing)

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute redirectTo="/login" component={<Layout />} />}
        >
          <Route index element={<HomeTab />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="statistics" element={<StatisticsTab />} />
        </Route>
        <Route
          path="login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="register"
          element={<RestrictedRoute component={<RegistrationPage />} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
