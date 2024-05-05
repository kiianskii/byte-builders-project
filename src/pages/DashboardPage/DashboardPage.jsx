import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency";
import Navigation from "../../components/Navigation/Navigation";
import s from "./DashboardPage.module.css";

function DashboardPage() {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className={s.dashboard}>
      <Navigation className={s.navigation_panel} />
      {isDesktop && <Currency />}
    </div>
  );
}

export default DashboardPage;
