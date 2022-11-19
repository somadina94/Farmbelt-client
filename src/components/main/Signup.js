import useInput from "../../hooks/userInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";
import { signUp } from "../../api/api";
import { authActions } from "../../store/auth-slice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: fullName,
    enteredValueIsValid: fullNameIsValid,
    hasError: fullNameIsInvalid,
    valueInputChangedHandler: fullNameInputChangedHandler,
    valueInputBlurHandler: fullNameInputBlurHandler,
    reset: fullNameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputInputChangedHandler,
    valueInputBlurHandler: emailInputInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: phoneInput,
    enteredValueIsValid: phoneInputIsValid,
    hasError: phoneInputIsInvalid,
    valueInputChangedHandler: phoneInputInputChangedHandler,
    valueInputBlurHandler: phoneInputInputBlurHandler,
    reset: phoneInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputInputChangedHandler,
    valueInputBlurHandler: passwordInputInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: confirmPassInput,
    enteredValueIsValid: confirmPassInputIsValid,
    hasError: confirmPassInputIsInvalid,
    valueInputChangedHandler: confirmPassInputInputChangedHandler,
    valueInputBlurHandler: confirmPassInputInputBlurHandler,
    reset: confirmPassInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    fullNameIsValid &&
    emailInputIsValid &&
    phoneInputIsValid &&
    passwordInputIsValid &&
    confirmPassInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHanlder = async (e) => {
    e.preventDefault();

    const data = {
      name: fullName,
      email: emailInput,
      phone: phoneInput,
      password: passwordInput,
      passwordConfirm: confirmPassInput,
    };

    const res = await signUp(data);

    dispatch(authActions.login({ user: res.data.user }));
    navigate("/", { replace: true });

    fullNameInputReset();
    emailInputReset();
    phoneInputReset();
    passwordInputReset();
    confirmPassInputReset();
  };

  const fullNameClasses = fullNameIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const phoneInputClasses = phoneInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const confirmPassInputClasses = confirmPassInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <div className={fullNameClasses}>
        <label>Fullname</label>
        <input
          type="text"
          value={fullName}
          onChange={fullNameInputChangedHandler}
          onBlur={fullNameInputBlurHandler}
        />
      </div>
      <div className={emailInputClasses}>
        <label>Email address</label>
        <input
          type="email"
          value={emailInput}
          onChange={emailInputInputChangedHandler}
          onBlur={emailInputInputBlurHandler}
        />
      </div>
      <div className={phoneInputClasses}>
        <label>Phone number</label>
        <input
          type="number"
          value={phoneInput}
          onChange={phoneInputInputChangedHandler}
          onBlur={phoneInputInputBlurHandler}
        />
      </div>
      <div className={passwordInputClasses}>
        <label>Password</label>
        <input
          type="password"
          value={passwordInput}
          onChange={passwordInputInputChangedHandler}
          onBlur={passwordInputInputBlurHandler}
        />
      </div>
      <div className={confirmPassInputClasses}>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassInput}
          onChange={confirmPassInputInputChangedHandler}
          onBlur={confirmPassInputInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Signup;
