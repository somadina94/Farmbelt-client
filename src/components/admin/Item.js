import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Item.module.css";
import { deleteProduct } from "../../api/api";
import { alertActions } from "../../store/alert-slice";
import { spinnerActions } from "../../store/spinner-slice";
import LoadSpinner from "../UI/LoadSpinner";

const Item = (props) => {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const { name, price, id, photo } = props;
  const prodPrice = `#${price.toFixed(2)}`;

  const deleteProdHandler = async () => {
    dispatch(spinnerActions.showSpinner());

    const res = await deleteProduct(id);

    if (res === "") {
      dispatch(
        alertActions.setState({
          message: "Product successfully deleted",
          status: "success",
        })
      );
    } else {
      dispatch(
        alertActions.setState({ message: res.message, status: "error" })
      );
    }

    dispatch(spinnerActions.hideSpinner());
  };

  return (
    <li className={classes.item}>
      {showSpinner && <LoadSpinner />}
      <h3>{name}</h3>
      <p>{prodPrice}</p>
      <div className={classes.img}>
        <img src={photo} alt="item name" />
      </div>
      <Link to={`/admin/products/${id}`}>Update Product</Link>
      <button to="/product/productId" onClick={deleteProdHandler}>
        Delete Product
      </button>
    </li>
  );
};

export default Item;
