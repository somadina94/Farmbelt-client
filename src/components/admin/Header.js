import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Header.module.css";
import logo from "../../images/logo.png";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <div className={classes.image}>
        <img src={logo} alt="logo" />
      </div>
      <nav className={classes.navigation}>
        <ul className={classes.nav}>
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/products/create">Create product</Link>
          </li>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/login" onClick={logoutHandler}>
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
