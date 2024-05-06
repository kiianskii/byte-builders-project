
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshThunk } from "./redux/auth/operations";
import { currencyThunk } from "./redux/currency/operations";
import { selectIsRefreshing } from "./redux/auth/authSlice";
import Loader from "./components/Loader/Loader";
import "./App.css";

import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { RedirectRoute } from "./routes/RedirectRoute";

import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomeTab from "./pages/HomeTab/HomeTab";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";
import Layout from "./components/Layout/Layout";
import CurrencyTab from "./pages/CurrencyTab/CurrencyTab";

const HomeTabLazy = lazy(() => import("./pages/HomeTab/HomeTab"));
const LayoutLazy = lazy(() => import("./components/Layout/Layout"));
const ErrorPageLazy = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const DashboardPageLazy = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const CurrencyTabLazy = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));

function App() {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
    dispatch(currencyThunk());
  }, [dispatch]);

  return isRefresh ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute redirectTo="/login" component={<Layout />} />}
        >
          <Route index element={<HomeTab />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route
            path="/currency"
            element={<RedirectRoute component={<CurrencyTab />} />}
          />
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


