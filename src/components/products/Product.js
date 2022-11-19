import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Product.module.css";
import { cartActions } from "../../store/cart-slice";
import RatingIcon from "../Icons/RatingIcon";

const Product = (props) => {
  const dispatch = useDispatch();
  const quantityRef = useRef();
  const price = `#${props.price.toFixed(2)}`;
  const { ratingsAverage, id, photo } = props;
  const ratingsArr = [1, 2, 3, 4, 5];
  // const { id } = props;

  const addProdToCartHandler = () => {
    dispatch(
      cartActions.add({
        name: props.name,
        id: props.id,
        price: props.price,
        quantity: quantityRef.current.value * 1,
        photo: props.photo,
      })
    );
  };

  return (
    <li className={classes.product}>
      <div className={classes.add}>
        <h4>Quantity</h4>
        <input type="number" ref={quantityRef} defaultValue="1" />
        <button onClick={addProdToCartHandler}>Add+</button>
      </div>
      <h3>{props.name}</h3>
      <div className={classes.price}>
        <p>Price</p>
        <span>{price}</span>
      </div>
      <div className={classes.ratings}>
        <p>Rating</p>
        <div className={classes.rating}>
          {ratingsArr.map((num) => (
            <RatingIcon
              key={Math.round(Math.random() * (10000 - 100 + 1) + 100)}
              className={
                num <= ratingsAverage
                  ? `${classes.active}`
                  : `${classes.inactive}`
              }
            />
          ))}
        </div>
      </div>
      <div className={classes.image}>
        <img src={photo} alt="top" />
      </div>
      <Link to={`${id}`}>View Details</Link>
    </li>
  );
};

export default Product;
