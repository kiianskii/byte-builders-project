import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import HomeTab from "./pages/HomeTab/HomeTab";

import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
// import { selectIsRefreshing } from './redux/auth/authSlice'
import { refreshThunk } from "./redux/auth/operations";
import ButtonAddTransactions from "./components/ButtonAddTransactions/ButtonAddTransactions";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";

function App() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  // const isRefreshing = useSelector(selectIsRefreshing)

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeTab />} />
          <Route path="/statistics" element={<StatisticsTab />} />
          <Route
            path="/btnAddTransactions"
            element={<ButtonAddTransactions />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
