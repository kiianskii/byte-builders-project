import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency";
import Navigation from "../../components/Navigation/Navigation";

function DashboardPage() {
  const isDesktop = useMediaQuery({ minWidth: 321 });

  return (
    <>
      <Navigation />
      {isDesktop && <Currency />}
    </>
  );
}

export default DashboardPage;
