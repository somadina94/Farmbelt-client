import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/userInput";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./ResetPassword.module.css";
import { alertActions } from "../../store/alert-slice";
import { resetPassword } from "../../api/api";
import { spinnerActions } from "../../store/spinner-slice";
import LoadSpinner from "../UI/LoadSpinner";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const params = useParams();
  const token = params.token;

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: confirmPassInput,
    enteredValueIsValid: confirmPassInputIsValid,
    hasError: confirmPassInputIsInvalid,
    valueInputChangedHandler: confirmPassInputChangedHandler,
    valueInputBlurHandler: confirmPassInputBlurHandler,
    reset: confirmPassInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (passwordInputIsValid && confirmPassInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());

    const data = {
      password: passwordInput,
      passwordConfirm: confirmPassInput,
    };

    const res = await resetPassword(data, token);

    if (res.status === "success") {
      dispatch(
        alertActions.setState({
          message: "Password resetted successfuly!",
          status: res.status,
        })
      );

      navigate("/login", { replace: true });
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    passwordInputReset();
    confirmPassInputReset();
    dispatch(spinnerActions.hideSpinner());
  };

  const passwordClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const confirmPassClasses = confirmPassInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <div className={passwordClasses}>
        <label>New password</label>
        <input
          type="password"
          value={passwordInput}
          onChange={passwordInputChangedHandler}
          onBlur={passwordInputBlurHandler}
        />
      </div>
      <div className={confirmPassClasses}>
        <label>New password</label>
        <input
          type="password"
          value={confirmPassInput}
          onChange={confirmPassInputChangedHandler}
          onBlur={confirmPassInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Reset password
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
