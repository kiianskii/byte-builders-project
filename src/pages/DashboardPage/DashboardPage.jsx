import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency";
import Navigation from "../../components/Navigation/Navigation";

function DashboardPage() {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="dashboard">
      <Navigation className="navigation_panel" />
      {isDesktop && <Currency />}
    </div>
  );
}

export default DashboardPage;
