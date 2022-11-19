import useInput from "../../hooks/userInput";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./Signin.module.css";
import { signIn } from "../../api/api";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setCookie = useCookies(["jwt"])[1];
  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const submitHanlder = async (e) => {
    e.preventDefault();
    const data = {
      email: emailInput,
      password: passwordInput,
    };

    const res = await signIn(data);

    if (res.status === "success") {
      dispatch(authActions.login({ user: res.data.user }));
      dispatch(
        alertActions.setState({
          message: "Signed in successfully! Welcome🤝",
          status: res.status,
        })
      );
      setCookie("jwt", res.token);
      if (res.data.user.role === "user") {
        navigate("/", { replace: true });
      } else if (res.data.user.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    emailInputReset();
    passwordInputReset();
  };

  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <div className={emailInputClasses}>
        <label>Email address</label>
        <input
          type="email"
          value={emailInput}
          onChange={emailInputChangedHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      <div className={passwordInputClasses}>
        <label>Password</label>
        <input
          type="password"
          value={passwordInput}
          onChange={passwordInputChangedHandler}
          onBlur={passwordInputBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <Link className={classes.forgot} to="/forgotPassword">
          Forgot password?
        </Link>
        <button type="submit" disabled={!formIsValid}>
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Signin;
