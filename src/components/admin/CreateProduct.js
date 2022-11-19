import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./CreateProduct.module.css";
import { createProduct } from "../../api/api";
import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";
import LoadSpinner from "../UI/LoadSpinner";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const photoInputRef = useRef();
  const photosInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(spinnerActions.showSpinner());
    const form = new FormData();
    const photosLength = photosInputRef.current.files.length;

    for (let i = 0; i < photosLength; i++) {
      form.append("photos", photosInputRef.current.files[i]);
    }
    form.append("name", nameInputRef.current.value);
    form.append("price", priceInputRef.current.value);
    form.append("description", descriptionInputRef.current.value);
    form.append("photo", photoInputRef.current.files[0]);

    const res = await createProduct(form);

    if (res.status === "success") {
      dispatch(
        alertActions.setState({ message: res.message, status: res.status })
      );
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showSpinner && <LoadSpinner />}
      <div className={classes.group}>
        <label>Name</label>
        <input type="text" ref={nameInputRef} />
      </div>
      <div className={classes.group}>
        <label>Price</label>
        <input type="number" ref={priceInputRef} />
      </div>
      <div className={classes.group}>
        <label>Description</label>
        <textarea type="text" ref={descriptionInputRef} />
      </div>
      <div className={classes.group}>
        <label>Cover photo</label>
        <input type="file" ref={photoInputRef} />
      </div>
      <div className={classes.group}>
        <label>Other photos</label>
        <input type="file" multiple="multiple" ref={photosInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateProduct;
