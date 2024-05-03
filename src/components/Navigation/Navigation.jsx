import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { Icon } from "../../img/Icon";

function Navigation() {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink className={s.navlink} to="/">
          <Icon size={24} id="home" />
          <span>Home</span>
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink className={s.navlink} to="/statistics">
          <Icon size={24} id="statistic" />
          <span>Statistics</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
