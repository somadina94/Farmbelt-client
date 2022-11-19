import { NavLink } from "react-router-dom";

import classes from "./UserNav.module.css";

const UserNav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="/dashboard/me"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Profile Information
          </NavLink>
        </li>
        <li>
          <NavLink
            to="updateMe"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Update Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="updatePassword"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Update Password
          </NavLink>
        </li>
        <li>
          <NavLink
            to="orders"
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            Oders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
