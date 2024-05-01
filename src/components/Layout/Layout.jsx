import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Layout;
