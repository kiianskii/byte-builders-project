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

function App() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeTab />} />
          <Route
            path="/btnAddTransactions"
            element={<ButtonAddTransactions />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
