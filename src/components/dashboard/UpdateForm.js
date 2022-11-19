import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/userInput";
import { useNavigate } from "react-router-dom";

import classes from "./UpdateForm.module.css";
import { updateMe } from "../../api/api";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";

const UpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    value: nameInput,
    enteredValueIsValid: nameInputIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangedHandler: nameInputChangedHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: phoneInput,
    enteredValueIsValid: phoneInputIsValid,
    hasError: phoneInputIsInvalid,
    valueInputChangedHandler: phoneInputChangedHandler,
    valueInputBlurHandler: phoneInputBlurHandler,
    reset: phoneInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (nameInputIsValid && emailInputIsValid && phoneInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
    };

    const res = await updateMe(data);

    if (res.status === "success") {
      dispatch(authActions.refreshUser({ user: res.data.user }));
      dispatch(
        alertActions.setState({ message: res.message, status: res.status })
      );
      navigate("/dashboard");
    } else {
      dispatch(alertActions({ message: res.message, status: "error" }));
    }

    nameInputReset();
    emailInputReset();
    phoneInputReset();
  };

  const nameClasses = nameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const emailClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const phoneClasses = phoneInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label>Fullname</label>
        <input
          type="text"
          value={nameInput}
          onChange={nameInputChangedHandler}
          onBlur={nameInputBlurHandler}
          placeholder={user.name}
        />
      </div>
      <div className={emailClasses}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder={user.email}
          value={emailInput}
          onChange={emailInputChangedHandler}
          onBlur={emailInputBlurHandler}
        />
      </div>
      <div className={phoneClasses}>
        <label>Phone line</label>
        <input
          type="number"
          placeholder={user.phone}
          value={phoneInput}
          onChange={phoneInputChangedHandler}
          onBlur={phoneInputBlurHandler}
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

export default UpdateForm;
