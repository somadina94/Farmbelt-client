import useInput from "../../hooks/userInput";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ForgotPassword.module.css";
import { forgotPassword } from "../../api/api";
import { alertActions } from "../../store/alert-slice";
import LoadSpinner from "../UI/LoadSpinner";
import { spinnerActions } from "../../store/spinner-slice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));
  let formIsValid = false;

  if (emailInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());

    const res = await forgotPassword({ email: emailInput });
    if (res.status === "success") {
      dispatch(
        alertActions.setState({ message: res.message, status: res.status })
      );
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    emailInputReset();
    dispatch(spinnerActions.hideSpinner());
  };

  const formClasses = emailInputIsInvalid
    ? `${classes.form} ${classes.invalid}`
    : classes.form;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <label>Email</label>
      <input
        type="email"
        value={emailInput}
        onChange={emailInputChangedHandler}
        onBlur={emailInputBlurHandler}
      />
      <button type="submit" disabled={!formIsValid}>
        Submit
      </button>
    </form>
  );
};

export default ForgotPassword;
