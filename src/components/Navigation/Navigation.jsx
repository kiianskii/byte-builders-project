import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/statistics">Statistics</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
