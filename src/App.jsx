import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// import { useSelector } from "react-redux";
// import Loader from "./components/Loader/Loader";
import { refreshThunk } from "./redux/auth/operations";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomeTab from "./pages/HomeTab/HomeTab";
// import { userTransactionsThunk } from "./redux/transactions/operations";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CurrencyTab from "./pages/CurrencyTab/CurrencyTab";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { currencyThunk } from "./redux/currency/operations";
// import { selectIsLoading } from "./redux/loader/loaderSlice";

function App() {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshThunk());
    dispatch(currencyThunk());
  }, [dispatch]);
  // isLoading ? <Loader /> : console.log("Is refreshing:", isLoading);
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
          <Route path="/currency" element={<CurrencyTab />} />
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
