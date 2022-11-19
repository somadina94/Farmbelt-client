import useInput from "../../hooks/userInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./PasswordForm.module.css";
import { alertActions } from "../../store/alert-slice";
import { updateMyPassword } from "../../api/api";

const PasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    value: curPassInput,
    enteredValueIsValid: curPassInputIsValid,
    hasError: curPassInputIsInvalid,
    valueInputChangedHandler: curPassInputChangedHandler,
    valueInputBlurHandler: curPassInputBlurHandler,
    reset: curPassInputReset,
  } = useInput((value) => value.trim() !== "");

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
  if (curPassInputIsValid && passwordInputIsValid && confirmPassInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      passwordCurrent: curPassInput,
      password: passwordInput,
      passwordConfirm: confirmPassInput,
    };

    const res = await updateMyPassword(data);

    if (res.status === "success") {
      dispatch(
        alertActions.setState({
          message: "Password updated successfully!",
          status: res.status,
        })
      );
      navigate("/dashboard");
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    curPassInputReset();
    passwordInputReset();
    confirmPassInputReset();
  };

  const curPassClasses = curPassInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const newPassClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;
  const confirmPassClasses = confirmPassInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={curPassClasses}>
        <label>Current password</label>
        <input
          type="password"
          value={curPassInput}
          onChange={curPassInputChangedHandler}
          onBlur={curPassInputBlurHandler}
        />
      </div>
      <div className={newPassClasses}>
        <label>New password</label>
        <input
          type="password"
          value={passwordInput}
          onChange={passwordInputChangedHandler}
          onBlur={passwordInputBlurHandler}
        />
      </div>
      <div className={confirmPassClasses}>
        <label>Confirm new password</label>
        <input
          type="password"
          value={confirmPassInput}
          onChange={confirmPassInputChangedHandler}
          onBlur={confirmPassInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Update
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
