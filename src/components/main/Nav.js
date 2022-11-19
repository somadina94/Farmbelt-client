import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Nav.module.css";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import { signOut } from "../../api/api";

const Nav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const signOutHandler = () => {
    signOut();
    dispatch(authActions.logout());
    dispatch(
      alertActions.setState({
        message: "Signed out successfully! Goodbye✋",
        status: "success",
      })
    );
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutUs"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contactUs"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Contact Us
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/signup"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Sign Up
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/login"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Sign In
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              to="/dashboard"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Dahsboard
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              to="/login"
              className={(navData) => (navData.isActive ? classes.active : "")}
              onClick={signOutHandler}
            >
              Sign out
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
