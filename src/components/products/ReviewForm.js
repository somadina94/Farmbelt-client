import useInput from "../../hooks/userInput";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./ReviewForm.module.css";
import styles from "../UI/General.module.css";
import { createReviewOnProduct } from "../../api/api";
import { alertActions } from "../../store/alert-slice";

const ReviewForm = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { jwt } = useCookies(["jwt"])[0];
  const { showRevForm } = props;
  const {
    value: reviewInput,
    enteredValueIsValid: reviewInputIsValid,
    hasError: reviewInputIsInvalid,
    valueInputChangedHandler: reviewInputChangedHandler,
    valueInputBlurHandler: reviewInputBlurHandler,
    reset: reviewInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: starInput,
    enteredValueIsValid: starInputIsValid,
    hasError: starInputIsInvalid,
    valueInputChangedHandler: starInputChangedHandler,
    valueInputBlurHandler: starInputBlurHandler,
    reset: starInputReset,
  } = useInput(
    (value) => value.trim() !== "" && value.trim() !== "Choose star"
  );

  let formIsValid = false;
  if (reviewInputIsValid && starInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      review: reviewInput,
      rating: starInput,
      product: productId,
    };

    const res = await createReviewOnProduct(data, productId, jwt);

    if (res.status === "success") {
      dispatch(
        alertActions.setState({ message: res.message, status: res.status })
      );
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    reviewInputReset();
    starInputReset();
  };

  const reviewClasses = reviewInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const starClasses = starInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const formClasses = showRevForm
    ? `${classes.form} ${styles.add}`
    : `${classes.form} ${styles.remove}`;

  return (
    <form className={formClasses} onSubmit={submitHandler}>
      <div className={reviewClasses}>
        <label>Review</label>
        <textarea
          value={reviewInput}
          onChange={reviewInputChangedHandler}
          onBlur={reviewInputBlurHandler}
        />
      </div>
      <div className={starClasses}>
        <label>Rating</label>
        <select
          value={starInput}
          onChange={starInputChangedHandler}
          onBlur={starInputBlurHandler}
        >
          <option>Choose star</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
