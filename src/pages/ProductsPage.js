import { Fragment } from "react";

import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { Outlet } from "react-router-dom";

const ProductsPage = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default ProductsPage;
