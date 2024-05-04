import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import s from "./Navigation.module.css";
import { Icon } from "../../img/Icon";
import Balance from "../Balance/Balance";

function Navigation() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink className={s.navlink} to="/">
            <Icon size={24} id="home" className={s.statIcon + " stat"} />
            {!isMobile && <span>Home</span>}
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={s.navlink} to="/statistics">
            <Icon size={24} id="statistic" className={s.statIcon + " stat"} />
            {!isMobile && <span>Statistic</span>}
          </NavLink>
        </li>
        {isMobile && (
          <li className={s.item}>
            <NavLink className={s.navlink} to="/currency">
              <Icon size={24} id="currency" className={s.statIcon + " stat"} />
            </NavLink>
          </li>
        )}
      </ul>
      <Balance />
    </div>
  );
}

export default Navigation;
