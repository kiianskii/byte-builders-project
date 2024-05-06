import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Header/Header";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/loader/loaderSlice";

function Layout() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <Header />
      <div className="layout-box container">
        <DashboardPage />
        <Outlet />
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default Layout;
