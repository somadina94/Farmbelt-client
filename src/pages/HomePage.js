import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      {!user || user.role === "user" ? <Header /> : ""}
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
