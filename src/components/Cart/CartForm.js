import useInput from "../../hooks/userInput";

import classes from "./CartForm.module.css";
import styles from "../UI/General.module.css";

const CartForm = (props) => {
  const { checkout, showForm } = props;

  const {
    value: nameInput,
    enteredValueIsValid: nameInputIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangedHandler: nameInputChangedHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: phoneInput,
    enteredValueIsValid: phoneInputIsValid,
    hasError: phoneInputIsInvalid,
    valueInputChangedHandler: phoneInputChangedHandler,
    valueInputBlurHandler: phoneInputBlurHandler,
    reset: phoneInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: streetInput,
    enteredValueIsValid: streetInputIsValid,
    hasError: streetInputIsInvalid,
    valueInputChangedHandler: streetInputChangedHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    reset: streetInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: aptInput,
    enteredValueIsValid: aptInputIsValid,
    hasError: aptInputIsInvalid,
    valueInputChangedHandler: aptInputChangedHandler,
    valueInputBlurHandler: aptInputBlurHandler,
    reset: aptInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: cityInput,
    enteredValueIsValid: cityInputIsValid,
    hasError: cityInputIsInvalid,
    valueInputChangedHandler: cityInputChangedHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    reset: cityInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: stateInput,
    enteredValueIsValid: stateInputIsValid,
    hasError: stateInputIsInvalid,
    valueInputChangedHandler: stateInputChangedHandler,
    valueInputBlurHandler: stateInputBlurHandler,
    reset: stateInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: zipcodeInput,
    enteredValueIsValid: zipcodeInputIsValid,
    hasError: zipcodeInputIsInvalid,
    valueInputChangedHandler: zipcodeInputChangedHandler,
    valueInputBlurHandler: zipcodeInputBlurHandler,
    reset: zipcodeInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    nameInputIsValid &&
    phoneInputIsValid &&
    streetInputIsValid &&
    aptInputIsValid &&
    cityInputIsValid &&
    zipcodeInputIsValid &&
    stateInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const address = {
      fullname: nameInput,
      phoneLine: phoneInput,
      street: streetInput,
      home: aptInput,
      city: cityInput,
      state: stateInput,
      zipcode: zipcodeInput,
    };

    checkout(address);

    nameInputReset();
    phoneInputReset();
    streetInputReset();
    aptInputReset();
    cityInputReset();
    stateInputReset();
    zipcodeInputReset();
  };

  const nameClasses = nameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const phoneClasses = phoneInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const streetClasses = streetInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const aptClasses = aptInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const cityClasses = cityInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const stateClasses = stateInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const zipcodeClasses = zipcodeInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const formClasses = showForm
    ? `${classes.form} ${styles.add}`
    : `${classes.form} ${styles.remove}`;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      <h2>Delivery address</h2>
      <div className={nameClasses}>
        <label>Fullname</label>
        <input
          type="text"
          value={nameInput}
          onChange={nameInputChangedHandler}
          onBlur={nameInputBlurHandler}
          required
        />
      </div>
      <div className={phoneClasses}>
        <label>Phone number</label>
        <input
          type="number"
          value={phoneInput}
          onChange={phoneInputChangedHandler}
          onBlur={phoneInputBlurHandler}
          required
        />
      </div>
      <div className={streetClasses}>
        <label>Street/P.O.Box</label>
        <input
          type="text"
          value={streetInput}
          onChange={streetInputChangedHandler}
          onBlur={streetInputBlurHandler}
          required
        />
      </div>
      <div className={aptClasses}>
        <label>Apt, suite, unit, building, floor, etc.</label>
        <input
          type="text"
          value={aptInput}
          onChange={aptInputChangedHandler}
          onBlur={aptInputBlurHandler}
          required
        />
      </div>
      <div className={cityClasses}>
        <label>City</label>
        <input
          type="text"
          value={cityInput}
          onChange={cityInputChangedHandler}
          onBlur={cityInputBlurHandler}
          required
        />
      </div>
      <div className={stateClasses}>
        <label>State</label>
        <input
          type="text"
          value={stateInput}
          onChange={stateInputChangedHandler}
          onBlur={stateInputBlurHandler}
          required
        />
      </div>
      <div className={zipcodeClasses}>
        <label>Zipcode</label>
        <input
          type="text"
          value={zipcodeInput}
          onChange={zipcodeInputChangedHandler}
          onBlur={zipcodeInputBlurHandler}
          required
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Order
        </button>
      </div>
    </form>
  );
};

export default CartForm;
