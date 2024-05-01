import { NavLink } from "react-router-dom"


function Navigation() {
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
    </div>
  )
}

export default Navigation