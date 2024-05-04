import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

function Layout() {
  return (
    <div>
      <Header />
      <div className="layout-box container">
        <DashboardPage />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
