import { useRouteError } from "react-router-dom";

import classes from "./ErrorModal.module.css";

const ErrorModal = () => {
  const data = useRouteError();

  const message = data.message;

  return (
    <section className={classes.error}>
      <p>{message}</p>
    </section>
  );
};

export default ErrorModal;
