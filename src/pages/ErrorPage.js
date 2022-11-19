import { Fragment } from "react";

import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import ErrorModal from "../components/UI/ErrorModal";

const ErrorPage = () => {
  return (
    <Fragment>
      <Header />
      <ErrorModal />
      <Footer />
    </Fragment>
  );
};

export default ErrorPage;
