import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import classes from "./CartButton.module.css";
import CartIcon from "../Icons/CartIcon";
import { cartActions } from "../../store/cart-slice";

const CartButton = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <h3>Cart</h3>
      <CartIcon />
      <h3 className={classes.amount}>{cartQuantity}</h3>
    </button>
  );
};

export default CartButton;
