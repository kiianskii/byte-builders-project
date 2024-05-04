import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import s from "./Navigation.module.css";
import { Icon } from "../../img/Icon";

function Navigation() {
  const isMobile = useMediaQuery({ query: "(max-width: 320px)" });

  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink className={s.navlink} to="/">
          <Icon size={24} id="home" className={s.statIcon} />
          <span>Home</span>
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink className={s.navlink} to="/statistics">
          <Icon size={24} id="statistic" className={s.statIcon} />
          <span>Statistics</span>
        </NavLink>
      </li>
      {isMobile && (
        <li className={s.item}>
          <NavLink className={s.navlink} to="/currency">
            <Icon size={24} id="currency" className={s.statIcon} />
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
