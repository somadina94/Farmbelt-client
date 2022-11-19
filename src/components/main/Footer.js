import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contactUs">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <p>Farmbelt | @ Copyright Farmbelt 2002-2022. All rights reserved</p>
    </section>
  );
};

export default Footer;
