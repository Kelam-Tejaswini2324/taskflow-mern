import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Register</Link>

      {" | "}

      <Link to="/login">Login</Link>

      {" | "}

      <Link to="/dashboard">Dashboard</Link>

      <hr />
    </nav>
  );
}

export default Navbar;