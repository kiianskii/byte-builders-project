import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";

function Layout() {
  return (
    <div>
      <Header />
      <DashboardPage />
      <Outlet />
    </div>
  );
}

export default Layout;
